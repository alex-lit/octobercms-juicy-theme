<?php

/* status:
 * 1 - success
 * 2 - mail function error
 * 3 - unknown
 */

	if (isset($_POST['send'])) {
		$status = 3;
		$data = $_POST['data'];
		$subj = $_POST['subj'];
		$msg = '';

		$msg.= '<h1 style="border-bottom: 20px solid #F0F2F5;color:#ffffff;padding:10px 20px;background-color:#1f2229;border-radius: 5px 5px 0 0;margin-bottom: 20px;margin-top: 0;">'. $subj .'</h1>';
		$msg.= '<p style="color: #434a54;padding: 0 20px 20px 20px;margin: 0;"><strong style="color: #434a54;font-weight: 700;">Дата</strong>: '. date('m.d.Y H:i:s') .'</p>';

		foreach ($data as $item) {
			$msg.= '<p style="color: #434a54;padding: 0 20px 0 20px;margin: 0;"><strong style="color: #434a54;font-weight: 700;">' . $item['label'] . ': </strong>' . $item['value'] . '</p>';
		}

		$msg = '
			<html>
				<head>
					<title>'.$subj.'</title>
				</head>
				<body>
					<div style="background-color: #ffffff; padding:0 0 20px 0; color: #434a54;">
						<div style="float:left;border-radius: 5px;background-color: #f0f2f5;box-shadow: 0px 2px 0px 0px rgba(1, 1, 1, 0.06);padding: 0px 0px 20px;font-family: Calibri Light, Arial, Sans-Serif;font-size: 16px;font-weight: 300;">
							' . $msg . '</div>
					</div>
				</body>
			</html>';

		$h  = 'MIME-Version: 1.0' . "\r\n";
		$h .= 'Content-type: text/html; charset=utf-8' . "\r\n";

		$subj = "=?utf-8?B?" . base64_encode($subj) . "?=";
		$to = $_POST['to'];

		$status = (@mail($to, $subj, $msg, $h)) ? 1:2;

		echo $status;
	}

?>