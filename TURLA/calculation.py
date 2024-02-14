from flask import Flask, request, jsonify
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp
from flask_cors import CORS
from functools import partial


app = Flask(__name__)
CORS(app)


def create_data_model(locations):
    data = {}
    data['locations'] = locations
    data['num_locations'] = len(locations)
    return data

def distance_callback(from_index, to_index, data):
    from_node = data['manager'].IndexToNode(from_index)
    to_node = data['manager'].IndexToNode(to_index)
    return data['distances'][from_node][to_node]

def get_route(manager, routing, solution):
    index = routing.Start(0)
    route = []
    while not routing.IsEnd(index):
        node = manager.IndexToNode(index)
        route.append(node)
        index = solution.Value(routing.NextVar(index))
    return route


@app.route('/calculate-route', methods=['POST'])
def calculate_route():
    req_data = request.get_json()
    current_location = req_data['currentLocation']
    locations = req_data['locations']

    # Mevcut konumun listeye eklenmesi
    if current_location not in locations:
        locations.append(current_location)

    data = create_data_model(locations)

    # Create the routing index manager.
    manager = pywrapcp.RoutingIndexManager(data['num_locations'], 1, 0)

    # Create Routing Model.
    routing = pywrapcp.RoutingModel(manager)

    # Create and register a transit callback.
    transit_callback_index = routing.RegisterTransitCallback(
        partial(distance_callback, data=data))

    # Define cost of each arc.
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

    # Set 1st location as current location
    current_index = data['locations'].index(current_location)
    routing.AddDepot(current_index)

    # Diğer konumları ekleyin
    for i in range(data['num_locations']):
        if i != current_index:
            routing.AddLocation(i)

    # Set parameters for LKH solver
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.local_search_metaheuristic = (
        routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH)
    search_parameters.time_limit.seconds = 1

    # Solve the problem.
    solution = routing.SolveWithParameters(search_parameters)

    # Get the route
    if solution:
        route = get_route(manager, routing, solution)
        shortest_route = [data['locations'][i] for i in route]
        return jsonify(shortest_route)
    else:
        return jsonify({'error': 'No solution found.'}), 400

if __name__ == '__main__':
    app.run(debug=True)  # Debug modunda çalıştırıyoruz
