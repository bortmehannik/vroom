<?php
	/**
	 * Created by PhpStorm.
	 * User: Jurgen
	 * Date: 29.05.2019
	 * Time: 15:58
	 */


//	$result[1] = '[{"Name":"VROOM GAMES - м. Горьковская, м. Выборгская","City":"Санкт-Петербург","Address":"197046, Петроградская набережная д. 18 к. 4","Id":1,"Rooms":[{"Name":"Playstation PRO","Id":7,"Games":{"3":"Playstation PRO GAMES"}},{"Name":"Optitrack","Id":14,"Games":{"1":"Mystery of the Pyramid"}}]}]';
//	$result[1] = '[
//	    {"Name":"VROOM GAMES - м. Горьковская, м. Выборгская","City":"Санкт-Петербург","Address":"197046, Петроградская набережная д. 18 к. 4","Id":1,"Rooms":[{"Name":"Playstation PRO","Id":7,"Games":{"3":"Playstation PRO GAMES", "4":"Kek"}},{"Name":"Optitrack","Id":14,"Games":{"1":"Mystery of the Pyramid"}}]}
//    ]';

	$arrGames = [
        0 => [
            'id' => 1,
            'Name' => 'VROOM GAMES - м. Горьковская, м. Выборгская',
            'City' => 'Санкт-Петербург',
            'Address' => '197046, Петроградская набережная д. 18 к. 4',
            'Rooms' => [
                0 => [
                    'id' => 7,
                    'Name' => 'Playstation PRO',
                    'Games' => [
                        3 => 'Playstation PRO GAMES',
                        4 => 'Kek'
                    ]
                ],
                1 => [
                    'id' => 14,
                    'Name' => 'Optitrack',
                    'Games' => [
                        1 => 'Mystery of the Pyramid'
                    ]
                ]
            ]
        ],
    ];

	echo json_encode($arrGames);
