<?php
header("Content-type: text/html; charset=utf-8");
//**********************************************
if(empty($_POST['js'])){

    $log =="";
    $error="no"; //флаг наличия ошибки

    $phone = addslashes($_POST['phone']);
    $phone = htmlspecialchars($phone);
    $phone = stripslashes($phone);
    $phone = trim($phone);

    $name = addslashes($_POST['name']);
    $name = htmlspecialchars($name);
    $name = stripslashes($name);
    $name = trim($name);

    $datetime = addslashes($_POST['date-time']);
    $datetime = htmlspecialchars($datetime);
    $datetime = stripslashes($datetime);
    $datetime = trim($datetime);

    $typegame = addslashes($_POST['type-game']);
    $typegame = htmlspecialchars($typegame);
    $typegame = stripslashes($typegame);
    $typegame = trim($typegame);

    $count = addslashes($_POST['count']);
    $count = htmlspecialchars($count);
    $count = stripslashes($count);
    $count = trim($count);

    $text = addslashes($_POST['text']);
    $text = htmlspecialchars($text);
    $text = stripslashes($text);
    $text = trim($text);



    $log.= "";
//Если нет ошибок отправляем email
    if($error=="no")
    {
//Отправка письма админу о новом комментарии
        $to = "info@vroomgames.ru";//Ваш e-mail адрес

        $mes = "\nТема письма: Заявка с сайта";
        if ($phone){$mes .="\nТелефон: $phone";}
        if ($name){$mes .="\nИмя: $name";}
        if ($datetime){$mes .="\nДата и время: $datetime";}
        if ($typegame){$mes .="\nТип игры: $typegame";}
        if ($count){$mes .="\nКоличество игроков: $count";}
        if ($text){$mes .="\nТекст письма: $text";}


        $from = "site@vroomgames.ru";
        $sub = '=?utf-8?B?'.base64_encode('Новое сообщение с Вашего сайта ').'?=';
        $headers = 'From: '.$from.'
';
        $headers .= 'MIME-Version: 1.0
';
        $headers .= 'Content-type: text/plain; charset=utf-8
';
        mail($to, $sub, $mes, $headers);
        echo "1"; //Всё Ok!
    }
    else//если ошибки есть
    {
        echo $log; //Нельзя отправлять пустые сообщения

    }
}
