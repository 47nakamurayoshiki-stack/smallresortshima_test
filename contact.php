<?php
// お問い合わせ送信処理(PHP対応サーバー用)
header('Content-Type: application/json; charset=UTF-8');
mb_language('Japanese'); mb_internal_encoding('UTF-8');
$TO   = 'mm@imahayari.com';      // ★宛先メールアドレス(ここを差し替え)
$FROM = 'mm@imahayari.com';   // ★送信元(サーバーのドメインのアドレス)
$g = fn($k) => trim(str_replace(["\r","\n"], ' ', $_POST[$k] ?? ''));
$name=$g('name'); $kana=$g('kana'); $email=$g('email'); $tel=$g('tel');
$body = trim($_POST['body'] ?? '');
if(!$name||!$kana||!$body||!filter_var($email,FILTER_VALIDATE_EMAIL)){
  echo json_encode(['ok'=>false,'message'=>'入力内容をご確認ください。']);exit;}
$content="お名前: $name\nふりがな: $kana\nメール: $email\n電話番号: $tel\n\nお問い合わせ内容:\n$body\n";
$h="From: $FROM\r\nReply-To: $email";
$ok=mb_send_mail($TO,'【Small Resort 志摩】お問い合わせがありました',$content,$h);
// 自動返信メール文面
$auto="$name 様\n\nこの度はSmall Resort 志摩へお問い合わせいただき、誠にありがとうございます。\n以下の内容で受け付けいたしました。\n内容を確認のうえ、2〜3営業日以内に担当者よりご連絡いたします。\n\n----------------------------------------\n$content----------------------------------------\n\n※本メールは自動送信です。お心当たりのない場合は破棄してください。\n\nSmall Resort 志摩\n〒517-0704 三重県志摩市志摩町越賀759-3\n";
if($ok) mb_send_mail($email,'【Small Resort 志摩】お問い合わせありがとうございます',$auto,"From: $FROM");
echo json_encode($ok?['ok'=>true,'message'=>'送信が完了しました。確認メールをお送りしました。']:['ok'=>false,'message'=>'送信に失敗しました。']);
