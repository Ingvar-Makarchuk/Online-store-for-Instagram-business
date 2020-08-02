<?php
if(isset($_POST['myJson']))
{
  if(isset($_POST['myFormJson']))
{

    $uid = $_POST['myJson'];
    $form = $_POST['myFormJson'];

    $jsonArrayData = json_decode($uid, true);
    $jsonFormData = json_decode($form, true);
$txt = '';
 foreach ($jsonFormData as $userData) {
 
$txt .= <<<TEXT
<b><u>Контактные данные: </u></b>%0A<b>Имя</b>: {$userData['usernameValue']}%0A<b>Телефон</b>: {$userData['phoneValue']}%0A%0A<b>Доставка:</b>%0A%<b>Ф.И.О</b>: {$userData['usernameDeliveryValue']}%0A<b>Телефон получателя</b>: {$userData['phoneDeliveryValue']}%0A<b>Адресс</b>: {$userData['postValue']}%0A<b>№ Отделения</b>: {$userData['adressValue']}%0A<u>{$userData['commentValue']}</u>%0A <b>Итого: {$userData['goodsCost']} грн</b>%0A%0A
TEXT;
}

foreach ($jsonArrayData as $objectUserData) {
$txt .= <<<TEXT
<u>{$objectUserData['userMaterial']}<b> {$objectUserData['userSize']} </b>см%0A{$objectUserData['thisDesignNameCart']}</u>%0A%0A<b>Место: </b>{$objectUserData['userLocation']}%0A<b>Дата и время: </b>{$objectUserData['userDay']} {$objectUserData['userMonth']} {$objectUserData['userYear']} в {$objectUserData['userHour']} : {$objectUserData['userMinute']}%0A<b>Фраза: "</b><pre>{$objectUserData['userText']}</pre>"%0A%0A{$objectUserData['userComments']}%0A Цена: {$objectUserData['userPrice']} грн%0A%0A
TEXT;
}
     $token = "1032058772:AAFRiODZlPdMNpnVKfEK-T3tftLy0OuwGmk";
     $chat_id = "-459499767";


     $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
     
     if ($sendToTelegram) {
     } else {
       echo "Ошибка отправки заказа, пожалуйста повторите попытку или свяжитесь с нами через контакты на сайте. Спасибо";
     }
    }
  }
?>