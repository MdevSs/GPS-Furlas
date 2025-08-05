<?php


// Permitir requisições de origem cruzada
header("Access-Control-Allow-Origin: http://localhost:8081");
// ou substitua * pelo domínio exato se quiser restringir
header("Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// $res = [
//     "status" => $_POST
// ];
// echo (json_encode($res));
// header("Access-Control-Allow-Methods: GET, POST"); // Permite os métodos HTTP GET, POST e OPTIONS
// header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-API-KEY"); // Permite os cabeçalhos mencionados nas requisições
// header("Content-Type: application/json"); // Define o tipo de conteúdo da resposta como JSON

// // Define uma chave secreta para a API
// // define("API_KEY", "re98wr6ew8r6rew76r89e6rwer6w98r6ywe9r6r6w87e9wr6ew06r7"); // A chave de API que será usada para validar as requisições

// // Validar a chave da API
// $headers = getallheaders(); // Obtém todos os cabeçalhos da requisição
// // $receivedKey = $headers['X-API-KEY'] ?? ''; // Obtém a chave da API do cabeçalho X-API-KEY, se existir



// if ($receivedKey !== API_KEY) { // Verifica se a chave recebida é diferente da chave definida
//     http_response_code(403); // Retorna código de erro 403 (Proibido) se a chave for inválida
//     echo json_encode(["status" => "error", "message" => "Forbidden: Invalid API Key"]); // Retorna mensagem de erro em JSON
//     exit; // Finaliza a execução da API
// }

$con = mysqli_connect('localhost', 'root', '', 'bd');
// var_dump($con);


// Manipular requisição GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica se a requisição é do tipo GET
    
    global $con;
    // $oData = json_decode(file_get_contents("php://input"), true);
    
    // if($oData['FINDONE'] !== null) {
        
    // }
    // $dados=file_get_contents('php://input')
    // var_dump($dados);
    $oQuery = "SELECT * FROM cadastro";

    $res = $con->query($oQuery);

    $res = mysqli_fetch_all($res, MYSQLI_ASSOC);

    $response = [ // Cria a resposta com os dados fictícios
        "message" => "GET request received!", // Mensagem de sucesso
        "status" => "success", // Status da resposta
        "data" => [ // Dados retornados pela requisição GET
            $res
        ]
    ];
    echo json_encode($response); // Codifica a resposta em JSON e envia para o cliente
    exit; // Finaliza a execução
}

// Manipular requisição POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Verifica se a requisição é do tipo POST
    // Ler entrada JSON
    $input;
    $input = json_decode(file_get_contents('php://input'), true);// Lê o conteúdo JSON da requisição e converte para um array associativo
    // var_dump($input);
    if(!$input) { // Se o JSON não for válido
        echo json_encode(["status" => "error", "message" => "Invalid JSON data"]); // Retorna um erro informando que o JSON é inválido
        exit; // Finaliza a execução
    }
    if($input["login"] == "") {
        echo json_encode(["status" => "error", "message" => "Login empty"]); // Retorna um erro informando que o JSON é inválido
        exit;
    }
    if($input['password'] == ""){
        echo json_encode(["status" => "error", "message" => "Password empty"]); // Retorna um erro informando que o JSON é inválido
        exit;
    }

    $type = $input['type'];
    if($type == 'login'){
        $oQuery = "SELECT id, login FROM cadastro WHERE login='". $input['login'] ."' AND password='". $input['password'] ."';";
        // echo("SELECT login FROM cadastro WHERE login='". $input['login'] ."' AND password='". $input['password'] ."';");
        global $con;
        
        $res = $con -> query($oQuery);
        $data = $res->fetch_all(MYSQLI_ASSOC);
        // $res
        // var_dump($res);
        if($res->num_rows == 1){
            echo json_encode([
                "message" => "Logado com sucesso",
                "status" => "success",
                "data" => $data,
            ]);
        } 
        else 
            {
            echo json_encode([
                            "message" => "Credenciais incorretas",
                            "status" => "error",
                            "data" => false
                            ]
            );
        }
    }else if($type == 'cadastro'){
        $oQuery = "INSERT INTO `cadastro` (`login`, `password`) VALUES ('". $input["login"] ."', '". $input["password"] ."');";
    
        $res = $con->query($oQuery);

        // var_dump($res);
        // Construir resposta
        $response = [
            "message" => "POST request received!", // Mensagem de sucesso
            "status" => "success", // Status da resposta
            "data" => [ // Dados retornados pela requisição POST
                "login" => $input["login"], // Nome extraído do JSON ou "Anonymous"
                "password" => $input["password"]
            ]
        ];
        echo json_encode($response); // Codifica a resposta em JSON e envia para o cliente
    }

    

    // Extrair valores da entrada JSON
    
    exit; // Finaliza a execução
}

if($_SERVER['REQUEST_METHOD'] === "PATCH") {
    $input = json_decode(file_get_contents("php://input"), true);
    if(!$input){
        echo json_encode(["status" => "error", "message" => "sem input"]); // Retorna um erro informando que o JSON é inválido
        exit; 
    }
    $fetch = $input['fetch'];
    // var_dump($fetch);
    if($fetch['login'] === ""){
        echo json_encode(["status" => "error", "message" => "sem id"]); // Retorna um erro informando que o JSON é inválido
        exit; 
    }

    $cSQL = "UPDATE cadastro SET `coordinates` = '". $fetch['data'] ."' WHERE login = '". $fetch['login'] ."'";

    global $con;

    $res = $con->query($cSQL);

    $response = [
            "message" => "UP TO DATE", // Mensagem de sucesso
            "status" => "success", // Status da resposta
        ];
        echo json_encode($response);

    var_dump($res);

    exit;
}

// Se o método da requisição não for permitido, retornar erro
http_response_code(405); // Retorna código de erro 405 (Método Não Permitido) caso o método não seja GET nem POST
echo json_encode(["status" => "error", "message" => "Method Not Allowed"]); // Retorna uma mensagem de erro indicando que o método não é permitido
exit; // Finaliza a execução


?>