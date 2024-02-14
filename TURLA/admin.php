<?php
// Eğer form gönderildiyse
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Kullanıcı adı ve şifre kontrolü
    if(isset($_POST['username']) && isset($_POST['password'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];

        // Gerçek kullanıcı adı ve şifre
        $real_username = "admin";
        $real_password = "ozan1234";

        // Kullanıcı adı ve şifrenin doğru olup olmadığını kontrol et
        if ($username === $real_username && $password === $real_password) {
            // Kullanıcı adı ve şifre doğruysa, edit.php sayfasının içeriğini görüntüle
            ?>
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Add Data</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                    }
                    .container {
                        max-width: 600px;
                        margin: 50px auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .form-group {
                        margin-bottom: 20px;
                    }
                    label {
                        display: block;
                        font-weight: bold;
                    }
                    input[type="text"],
                    select {
                        width: 100%;
                        padding: 10px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                    }
                    input[type="submit"] {
                        width: 100%;
                        padding: 10px;
                        border: none;
                        border-radius: 5px;
                        background-color: #007bff;
                        color: #fff;
                        cursor: pointer;
                    }
                    input[type="submit"]:hover {
                        background-color: #0056b3;
                    }
                </style>
            </head>
            <body>
                <h2>Add Data</h2>
                <form action="" method="post" enctype="multipart/form-data">
                    <label for="image">Upload Image:</label>
                    <input type="file" name="image" id="image" accept="image/*" required><br><br>

                    <label for="title">Name:</label>
                    <input type="text" id="title" name="title" required><br><br>

                    <label for="category">Category:</label>
                    <select id="category" name="category" required>
                        <option value="Food">Food</option>
                        <option value="Historic">Historic</option>
                        <option value="Nature">Nature</option>
                    </select><br><br>

                    <label for="description">Description:</label>
                    <input type="text" id="description" name="description" required><br><br>

                    <label for="coords">Coords:</label>
                    <input type="text" id="coords" name="coords"><br><br>

                    <input type="submit" value="Veri Ekle">
                </form>
            </body>
            </html>
            <?php
        } else {
            // Kullanıcı adı veya şifre yanlışsa, hata mesajı göster
            echo "<alert>Hatalı Giriş!</alert>";
            echo "<p>Invalid username or password</p>";
        }
    } else {
        // Eğer form gönderildiyse, ancak kullanıcı adı veya şifre yoksa
        echo "<alert>Hatalı Giriş!</alert>";
        echo "<alert>Username and password are required</alert>";
    }

    // Eğer form gönderildiyse
    if(isset($_FILES['image']) && isset($_POST['title']) && isset($_POST['category']) && isset($_POST['description'])) {
        // JSON dosyasının yolu
        $json_file = 'data.json';

        // Resim dosyasını kaydetmek için hedef klasör
        $target_dir = "places/";

        // Resim dosyasını kontrol et
        if (!empty($_FILES["image"]["name"])) {
            // Dosyanın orijinal adını al
            $target_file = $target_dir . basename($_FILES["image"]["name"]);
            // Resmi hedef klasöre kaydet
            if (!move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
                echo "Error on uploading image.";
                exit;
            }
            // Resmin adını JSON formatına uygun olarak düzenle
            $image = "places/" . basename($_FILES["image"]["name"]);
        } else {
            echo "Please upload an image.";
            exit;
        }

        // Gönderilen diğer verileri al
        $title = $_POST['title'];
        $category = $_POST['category'];
        $description = $_POST['description'];
        $coords = isset($_POST['coords']) ? $_POST['coords'] : '';

        // Eğer herhangi bir alan boşsa hata ver
        if (empty($title) || empty($category) || empty($description)) {
            echo "Please fill all fields.";
            exit;
        }

        // Yeni veriyi veri dizisine ekle
        $data = json_decode(file_get_contents($json_file), true);
        $new_data = array(
            "image" => $image,
            "title" => $title,
            "category" => $category,
            "description" => $description,
            "coords" => $coords
        );
        // Yeni veriyi veri dizisine ekleyip JSON dosyasına yaz
        $data[] = $new_data;
        file_put_contents($json_file, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

        // JavaScript ile alert göster ve sayfayı yenileme
        echo '<script>alert("New data created succesfully."); window.location.replace("places.php");</script>';
    }
} else {
    // Eğer form gönderilmediyse veya GET isteği yapıldıysa, admin giriş formunu göster
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Login</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 400px;
                margin: 100px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .form-group {
                margin-bottom: 20px;
            }
            label {
                display: block;
                font-weight: bold;
            }
            input[type="text"],
            input[type="password"] {
                width: 100%;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
            input[type="submit"] {
                width: 100%;
                padding: 10px;
                border: none;
                border-radius: 5px;
                background-color: #007bff;
                color: #fff;
                cursor: pointer;
            }
            input[type="submit"]:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Admin Panel</h2>
            <form action="" method="post">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <input type="submit" value="Giriş Yap">
            </form>
        </div>
    </body>
    </html>
    <?php
}
?>
