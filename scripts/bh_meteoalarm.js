function warning_level_changed(selected_level) {
    let id = selected_level.getAttribute("id");
    let parametar = id.split("_")[0];
    let broj_unosa = id.split("_")[2];
    let level = selected_level.value;
    selected_level.style.backgroundColor = level;
    provjera_unosa(selected_level);
    impact_description(parametar, broj_unosa, level);
}

function provjera_unosa(element) {
    let id = element.getAttribute("id");
    let pojava = id.split("_")[0];
    let redni_broj = id.split("_")[2];
    let err = 0;
    let srednji_dio = ["_DescriptionBS_", "_DescriptionEN_", "_ImpactBS_", "_ImpactEN_", "_InstructionsBS_", "_InstructionsEN_"];
    for (let redni = 0; redni <= redni_broj; redni++) {
        try {
            let level = document.querySelector("#" + pojava + "_Level_" + redni).value;
            if (parseInt(document.querySelector("#" + pojava + "_StartHour_" + redni).value) >= parseInt(document.querySelector("#" + pojava + "_EndHour_" + redni).value)) {
                err += 1;
            }
            if (level != "green") {
                for (let sredina of srednji_dio) {
                    if (document.querySelector("#" + pojava + sredina + redni).value == "") {
                        err += 1;
                    }
                }
                if (document.querySelector("#" + pojava + "_Action_" + redni).value == "None") {
                    err += 1;
                }
            }
        } catch {};
    }
    if (err == 0) {
        document.querySelector("#dodaj_unos_btn").disabled = false;
    } else {
        document.querySelector("#dodaj_unos_btn").disabled = true;
    }
}

function impact_description(pojava, redni_broj, level) {
    if (level == 'yellow') {
        if (pojava == 'WIND') {
            document.querySelector("#" + pojava + '_ImpactBS_' + redni_broj).value = 'BUDITE SVJESNI. Budite u toku sa aktuelnom vremenskom prognozom. Očekujte manje smetnje u aktivnostima na otvorenom.';
            document.querySelector("#" + pojava + '_ImpactEN_' + redni_broj).value = 'BE AWARE. Keep up to date with the latest weather forecast. Expect minor distractions from outdoor activities.';
            document.querySelector("#" + pojava + '_InstructionsBS_' + redni_broj).value = 'Budite svjesni krhotina koje nosi vjetar. Lokalne smetenje u aktivnostima na otvorenom su moguće usljed krhotina koje nosi vjetar.';
            document.querySelector("#" + pojava + '_InstructionsEN_' + redni_broj).value = 'Be aware of the debris carried by the wind. Local disturbances in outdoor activities are possible due to debris carried by the wind.';
        } else if (pojava == 'RAIN') {
            document.querySelector("#" + pojava + '_ImpactBS_' + redni_broj).value = 'BUDITE SVJESNI. Budite u toku sa aktuelnom vremenskom prognozom. Očekujte manje smetnje u aktivnostima na otvorenom.';
            document.querySelector("#" + pojava + '_ImpactEN_' + redni_broj).value = 'BE AWARE. Keep up to date with the latest weather forecast. Expect minor distractions from outdoor activities.';
            document.querySelector("#" + pojava + '_InstructionsBS_' + redni_broj).value = 'Budite svjesni mogućnosti za lokalno plavljenje manjeg broja imovine, sa lokalnim ometanjem u aktivnostima na otvorenom. Teški uslovi za vožnju uslijed smanjenje vidljivosti i nekontrolisanog kretanja vozila uslijed vode.';
            document.querySelector("#" + pojava + '_InstructionsEN_' + redni_broj).value = 'Be aware of the possibility of local flooding of a small number of properties, with local disruption to outdoor activities. Difficult driving conditions due to reduced visibility and uncontrolled movement of vehicles due to water.';
        } else if (pojava == 'SNOW-ICE') {
            document.querySelector("#" + pojava + '_ImpactBS_' + redni_broj).value = 'BUDITE SVJESNI. Budite u toku sa aktuelnom vremenskom prognozom. Očekujte manje smetnje u aktivnostima na otvorenom.';
            document.querySelector("#" + pojava + '_ImpactEN_' + redni_broj).value = 'BE AWARE. Keep up to date with the latest weather forecast. Expect minor distractions from outdoor activities.';
            document.querySelector("#" + pojava + '_InstructionsBS_' + redni_broj).value = 'Budite svjesni rasprostranjenog snijega i/ili leda na saobraćajnicama i trotoarima. Lokalne smetenje u aktivnostima na otvorenom. Budite pažljivi kada hodate, vozite biciklo ili vozite automobil uslijed klizavih površina.';
            document.querySelector("#" + pojava + '_InstructionsEN_' + redni_broj).value = 'Be aware of snow and/or ice on roads and sidewalks. Local distraction in outdoor activities. Be careful when walking, cycling or driving due to slippery surfaces.';
        } else if (pojava == 'THUNDERSTORM') {
            document.querySelector("#" + pojava + '_ImpactBS_' + redni_broj).value = 'BUDITE SVJESNI. Budite u toku sa aktuelnom vremenskom prognozom. Očekujte manje smetnje u aktivnostima na otvorenom.';
            document.querySelector("#" + pojava + '_ImpactEN_' + redni_broj).value = 'BE AWARE. Keep up to date with the latest weather forecast. Expect minor distractions from outdoor activities.';
            document.querySelector("#" + pojava + '_InstructionsBS_' + redni_broj).value = 'Budite svjesni da se mogu pojaviti oluje sa grmljavinom. Budite posebno pažljivi u izloženim područjima, kao što su planine, šume i otvoreni tereni. Smetnje u vanjskim aktivnostima su moguće.';
            document.querySelector("#" + pojava + '_InstructionsEN_' + redni_broj).value = 'Be aware that thunderstorms may occur. Be especially careful in exposed areas, such as mountains, forests and open terrain. Disruptions in outdoor activities are possible.';
        } else if (pojava == 'HIGH-TEMPERATURE') {
            document.querySelector("#" + pojava + '_ImpactBS_' + redni_broj).value = 'BUDITE SVJESNI. Budite u toku sa aktuelnom vremenskom prognozom. Očekujte manje smetnje u aktivnostima na otvorenom.';
            document.querySelector("#" + pojava + '_ImpactEN_' + redni_broj).value = 'BE AWARE. Keep up to date with the latest weather forecast. Expect minor distractions from outdoor activities.';
            document.querySelector("#" + pojava + '_InstructionsBS_' + redni_broj).value = 'Budite svjesni da se očekuju visoke temperature zraka. Mogući su  zdravstveni rizici među ugroženim osobama, na primjer starije vrlo mlade osobe.';
            document.querySelector("#" + pojava + '_InstructionsEN_' + redni_broj).value = 'Be aware that you should expect high temperature. There are possible health risks among vulnerable people, for example older and very young people.';
        } else if (pojava == 'LOW-TEMPERATURE') {
            document.querySelector("#" + pojava + '_ImpactBS_' + redni_broj).value = 'BUDITE SVJESNI. Budite u toku sa aktuelnom vremenskom prognozom. Očekujte manje smetnje u aktivnostima na otvorenom.';
            document.querySelector("#" + pojava + '_ImpactEN_' + redni_broj).value = 'BE AWARE. Keep up to date with the latest weather forecast. Expect minor distractions from outdoor activities.';
            document.querySelector("#" + pojava + '_InstructionsBS_' + redni_broj).value = 'Budite svjesni da se očekuju niske temperature zraka. Mogući su zdravstveni rizici među ugroženom populacijom, na primjer, starije i veoma mlade osobe i beskućnici.';
            document.querySelector("#" + pojava + '_InstructionsEN_' + redni_broj).value = 'Be aware that low air temperatures are expected. There are possible health risks among the vulnerable population, for example, the elderly and very young people and the homeless.';
        } else if (pojava == 'FOG') {
            document.querySelector("#" + pojava + '_ImpactBS_' + redni_broj).value = 'BUDITE SVJESNI. Budite u toku sa aktuelnom vremenskom prognozom. Očekujte manje smetnje u aktivnostima na otvorenom.';
            document.querySelector("#" + pojava + '_ImpactEN_' + redni_broj).value = 'BE AWARE. Keep up to date with the latest weather forecast. Expect minor distractions from outdoor activities.';
            document.querySelector("#" + pojava + '_InstructionsBS_' + redni_broj).value = 'Budite svjesni lokalno guste magle. Može izrazito uticati na rutinske aktivnosti na otvorenom. Može izazvati kašnjenje letova i zatvaranje aerodroma, otežane uslove za vožnju i duže vrijeme putovanja.';
            document.querySelector("#" + pojava + '_InstructionsEN_' + redni_broj).value = 'Be aware of locally thick fog. It can significantly affect routine outdoor activities. This can cause flight delays and airport closures, difficult driving conditions and longer travel times.';
        }
    } else if (level == 'orange') {
        if (pojava == 'WIND') {
            document.querySelector("#" + pojava + '_ImpactBS_' + redni_broj).value = 'BUDITE SPREMNI. Poduzmite mjere opreza i pratite aktuelnu prognozu vremena. Očekujte ometanja u dnevnim rutinama i BUDITE SPREMNI obustaviti aktivnosti na otvorenom.';
            document.querySelector("#" + pojava + '_ImpactEN_' + redni_broj).value = 'BE READY. Take precautions and follow the latest weather forecast. Expect distractions in your daily routines and BE READY to stop outdoor activities.';
            document.querySelector("#" + pojava + '_InstructionsBS_' + redni_broj).value = 'Budite spremni na smetnje, strukturalna oštećenja i rizik za povrede od iščupanih stabala i krhotina koje nosi vjetar. Prekidi u snadbijevanju električnom energijom su mogući.';
            document.querySelector("#" + pojava + '_InstructionsEN_' + redni_broj).value = 'Be prepared for interference, structural damage, and the risk of injury from uprooted trees and wind-borne debris. Interruptions in electricity supply are possible.';
        } else if (pojava == 'RAIN') {
            document.querySelector("#" + pojava + '_ImpactBS_' + redni_broj).value = 'BUDITE SPREMNI. Poduzmite mjere opreza i pratite aktuelnu prognozu vremena. Očekujte ometanja u dnevnim rutinama i BUDITE SPREMNI obustaviti aktivnosti na otvorenom.';
            document.querySelector("#" + pojava + '_ImpactEN_' + redni_broj).value = 'BE READY. Take precautions and follow the latest weather forecast. Expect distractions in your daily routines and BE READY to stop outdoor activities.';
            document.querySelector("#" + pojava + '_InstructionsBS_' + redni_broj).value = 'Budite spremni da zaštitite sebe i svoju imovinu. Plavljenje imovine i saobraćajnih mreža su moguće. Poremećaj u snadbijevanju električnom energijom, vodom i u komunikacijama je moguć. Može biti potrebna manja evakuacija. Teški uslovi za vožnju uslijed smanjenje vidljivosti i nekontrolisanog kretanja vozila uslijed vode.';
            document.querySelector("#" + pojava + '_InstructionsEN_' + redni_broj).value = 'Be prepared to protect yourself and your property. Flooding of property and traffic networks is possible. Disruption in the supply of electricity, water and communications is possible. Minor evacuation may be required. Difficult driving conditions due to reduced visibility and uncontrolled movement of vehicles due to water.';
        } else if (pojava == 'SNOW-ICE') {
            document.querySelector("#" + pojava + '_ImpactBS_' + redni_broj).value = 'BUDITE SPREMNI. Poduzmite mjere opreza i pratite aktuelnu prognozu vremena. Očekujte ometanja u dnevnim rutinama i BUDITE SPREMNI obustaviti aktivnosti na otvorenom.';
            document.querySelector("#" + pojava + '_ImpactEN_' + redni_broj).value = 'BE READY. Take precautions and follow the latest weather forecast. Expect distractions in your daily routines and BE READY to stop outdoor activities.';
            document.querySelector("#" + pojava + '_InstructionsBS_' + redni_broj).value = 'Budite spremni za široko rasprostranjen snijeg i/ili led koji dovode do poremećaja u cestovnom, željezničkom i vazdušnom saobraćaju i aktivnostima na otvorenom.';
            document.querySelector("#" + pojava + '_InstructionsEN_' + redni_broj).value = 'Be prepared for snow and/or ice that disrupts road, rail and air traffic and outdoor activities.';
        } else if (pojava == 'THUNDERSTORM') {
            document.querySelector("#" + pojava + '_ImpactBS_' + redni_broj).value = 'BUDITE SPREMNI. Poduzmite mjere opreza i pratite aktuelnu prognozu vremena. Očekujte ometanja u dnevnim rutinama i BUDITE SPREMNI obustaviti aktivnosti na otvorenom.';
            document.querySelector("#" + pojava + '_ImpactEN_' + redni_broj).value = 'BE READY. Take precautions and follow the latest weather forecast. Expect distractions in your daily routines and BE READY to stop outdoor activities.';
            document.querySelector("#" + pojava + '_InstructionsBS_' + redni_broj).value = 'Budite spremni na žestoke oluje sa grmljavinom i zaštitite sebe od udara groma. Može doći do oštečenja imovine i drveća. Iznenadna poplava, udari vjetra i grad su mogući. Može se očekivati poremećaj u transportu i aktivnostima na otvorenom.';
            document.querySelector("#" + pojava + '_InstructionsEN_' + redni_broj).value = 'Be prepared for heavy thunderstorms and protect yourself from lightning strikes. Property and trees may be damaged. Sudden floods, gusts of wind and hail are possible. Disruption of transportation and outdoor activities can be expected.';
        } else if (pojava == 'HIGH-TEMPERATURE') {
            document.querySelector("#" + pojava + '_ImpactBS_' + redni_broj).value = 'BUDITE SPREMNI. Poduzmite mjere opreza i pratite aktuelnu prognozu vremena. Očekujte ometanja u dnevnim rutinama i BUDITE SPREMNI obustaviti aktivnosti na otvorenom.';
            document.querySelector("#" + pojava + '_ImpactEN_' + redni_broj).value = 'BE READY. Take precautions and follow the latest weather forecast. Expect distractions in your daily routines and BE READY to stop outdoor activities.';
            document.querySelector("#" + pojava + '_InstructionsBS_' + redni_broj).value = 'Budite spremni na visoke temperature koje će dovesti do zdravstvenih rizika među ugroženim osobama,  na primjer starije i vrlo mlade osobe. Slušajte i djelovati na savjet iz vlasti. Poslušajte i djelujte u skladu sa savjetima ovlaštenih organa.';
            document.querySelector("#" + pojava + '_InstructionsEN_' + redni_broj).value = 'Be prepared for high temperatures that will lead to health risks among vulnerable people, such as the elderly and very young people. Listen and act on government advice. Listen and act in accordance with the advice of the authorities.';
        } else if (pojava == 'LOW-TEMPERATURE') {
            document.querySelector("#" + pojava + '_ImpactBS_' + redni_broj).value = 'BUDITE SPREMNI. Poduzmite mjere opreza i pratite aktuelnu prognozu vremena. Očekujte ometanja u dnevnim rutinama i BUDITE SPREMNI obustaviti aktivnosti na otvorenom.';
            document.querySelector("#" + pojava + '_ImpactEN_' + redni_broj).value = 'BE READY. Take precautions and follow the latest weather forecast. Expect distractions in your daily routines and BE READY to stop outdoor activities.';
            document.querySelector("#" + pojava + '_InstructionsBS_' + redni_broj).value = 'Budite spremni očekuju se niske temperature zraka. Ovo će voditi zdravstvenim rizicima među ugroženom populacijom, na primjer, starije i veoma mlade osobe i beskućnici. Poslušajte i djelujte u skladu sa savjetima ovlaštenih organa.';
            document.querySelector("#" + pojava + '_InstructionsEN_' + redni_broj).value = 'Be prepared low air temperatures are expected. This will lead to health risks among the vulnerable population, for example, the elderly and very young people and the homeless. Listen and act in accordance with the advice of the authorities.';
        } else if (pojava == 'FOG') {
            document.querySelector("#" + pojava + '_ImpactBS_' + redni_broj).value = 'BUDITE SPREMNI. Poduzmite mjere opreza i pratite aktuelnu prognozu vremena. Očekujte ometanja u dnevnim rutinama i BUDITE SPREMNI obustaviti aktivnosti na otvorenom.';
            document.querySelector("#" + pojava + '_ImpactEN_' + redni_broj).value = 'BE READY. Take precautions and follow the latest weather forecast. Expect distractions in your daily routines and BE READY to stop outdoor activities.';
            document.querySelector("#" + pojava + '_InstructionsBS_' + redni_broj).value = 'Budite pripremljeni za široko rasprostranjenu i gustu maglu. Moguće zatvaranje glavnih aerodroma i brodskih luka. Opasni uslovi za vožnju i produženje potrebnog vremena za putovanje na cestovnom i željezničkom saobraćaju.';
            document.querySelector("#" + pojava + '_InstructionsEN_' + redni_broj).value = 'Be prepared for widespread and dense fog. Possible closure of major airports and ports. Dangerous driving conditions and extension of the time required to travel by road and rail.';
        }
    } else if (level == 'red') {
        if (pojava == 'WIND') {
            document.querySelector("#" + pojava + '_ImpactBS_' + redni_broj).value = 'PODUZMITE MJERE. Ostanite na oprezu i pratite savjete nadležnih službi. Budite u toku sa aktuelnom vremenskom prognozom i očekujte značajna ometanja u dnevnim rutinama. Putujte samo ako je neophodno';
            document.querySelector("#" + pojava + '_ImpactEN_' + redni_broj).value = 'TAKE PRECAUTIONS. Stay alert and follow the advice given by the authorities. Stay up to date with the latest weather forecast and expect significant disruptions in your daily routines. Travel only if your trip is essential.';
            document.querySelector("#" + pojava + '_InstructionsBS_' + redni_broj).value = 'Poduzeti mjere kako bi se zaštitili. Rizik za osobnu sigurnost od iščupanih stabala i krhotina koje nosi vjetar. Očekuju se rasprostranjena strukturalna oštečenja, zatvaranje saobraćajnica i nestanak električne energije.';
            document.querySelector("#" + pojava + '_InstructionsEN_' + redni_broj).value = 'Take necessary precautions for your safety. Risk to personal safety from uprooted trees and wind-borne debris. Widespread structural damage, road closures and power outages are expected.';
        } else if (pojava == 'RAIN') {
            document.querySelector("#" + pojava + '_ImpactBS_' + redni_broj).value = 'PODUZMITE MJERE. Ostanite na oprezu i pratite savjete nadležnih službi. Budite u toku sa aktuelnom vremenskom prognozom i očekujte značajna ometanja u dnevnim rutinama. Putujte samo ako je neophodno';
            document.querySelector("#" + pojava + '_ImpactEN_' + redni_broj).value = 'TAKE PRECAUTIONS. Stay alert and follow the advice given by the authorities. Stay up to date with the latest weather forecast and expect significant disruptions in your daily routines. Travel only if your trip is essential.';
            document.querySelector("#" + pojava + '_InstructionsBS_' + redni_broj).value = 'Poduzeti mjere kako bi zaštitili sebe i djelujte u skladu sa savjetima koje su dali ovlašteni organi. Rasprostranjene poplave imovine sa značajnim rizikom za živote i mogućom evakuacijom. Ozbiljan prekid u saobraćaju i snadbijevanju električnom energijom, vodom i komunikacijama su izgledni. Teški uslovi za vožnju uslijed smanjenje vidljivosti i nekontrolisanog kretanja vozila uslijed vode.';
            document.querySelector("#" + pojava + '_InstructionsEN_' + redni_broj).value = 'Take necessary precautions for your safety and act in accordance with the advice given by the authorities. Widespread property floods with significant risk to lives and possible evacuation. Serious disruptions in traffic and electricity, water and communications are likely. Difficult driving conditions due to reduced visibility and uncontrolled movement of vehicles due to water.';
        } else if (pojava == 'SNOW-ICE') {
            document.querySelector("#" + pojava + '_ImpactBS_' + redni_broj).value = 'PODUZMITE MJERE. Ostanite na oprezu i pratite savjete nadležnih službi. Budite u toku sa aktuelnom vremenskom prognozom i očekujte značajna ometanja u dnevnim rutinama. Putujte samo ako je neophodno';
            document.querySelector("#" + pojava + '_ImpactEN_' + redni_broj).value = 'TAKE PRECAUTIONS. Stay alert and follow the advice given by the authorities. Stay up to date with the latest weather forecast and expect significant disruptions in your daily routines. Travel only if your trip is essential.';
            document.querySelector("#" + pojava + '_InstructionsBS_' + redni_broj).value = 'Poduzeti mjere kako bi se zaštitili. Široko rasprostranjen snijeg i/ili ledeni pokrivač sa značajnim ometanjem u cestovnom, željezničkom i vazdušnom saobraćaju. Visok rizik da vozači postanu nasukani. Izbjegavajte putovanja koja nisu neophodna.';
            document.querySelector("#" + pojava + '_InstructionsEN_' + redni_broj).value = 'Take necessary precautions for your safety. Widespread snow and/or ice cover with significant disruption to road, rail and air traffic. High risk of drivers getting stranded. Avoid trips that are not necessary.';
        } else if (pojava == 'THUNDERSTORM') {
            document.querySelector("#" + pojava + '_ImpactBS_' + redni_broj).value = 'PODUZMITE MJERE. Ostanite na oprezu i pratite savjete nadležnih službi. Budite u toku sa aktuelnom vremenskom prognozom i očekujte značajna ometanja u dnevnim rutinama. Putujte samo ako je neophodno';
            document.querySelector("#" + pojava + '_ImpactEN_' + redni_broj).value = 'TAKE PRECAUTIONS. Stay alert and follow the advice given by the authorities. Stay up to date with the latest weather forecast and expect significant disruptions in your daily routines. Travel only if your trip is essential.';
            document.querySelector("#" + pojava + '_InstructionsBS_' + redni_broj).value = 'Poduzeti mjere kako bi zaštitili sebe i djelujte u skladu sa savjetima koje su dali ovlašteni organi. Izgledne je široko rasprostranjeno grmljavinska oluja sa opasnostima po život od groma, grada, poplave i šteet prourokovane olujom. Može se očekivati prekid u transportu i električnoj energiji. Značajne smetnje u normalnim rutinama su moguće. Izbjegavajte putovanja koja nisu neophodna.';
            document.querySelector("#" + pojava + '_InstructionsEN_' + redni_broj).value = 'Take necessary precautions for your safety and follow the advice given by authorized organizations. There is a widespread thunderstorm with dangers to life from thunder, hail, floods and damage caused by the storm. Interruptions in transport and electricity can be expected. Significant disturbances in normal routines are possible. Avoid trips that are not necessary.';
        } else if (pojava == 'HIGH-TEMPERATURE') {
            document.querySelector("#" + pojava + '_ImpactBS_' + redni_broj).value = 'PODUZMITE MJERE. Ostanite na oprezu i pratite savjete nadležnih službi. Budite u toku sa aktuelnom vremenskom prognozom i očekujte značajna ometanja u dnevnim rutinama. Putujte samo ako je neophodno';
            document.querySelector("#" + pojava + '_ImpactEN_' + redni_broj).value = 'TAKE PRECAUTIONS. Stay alert and follow the advice given by the authorities. Stay up to date with the latest weather forecast and expect significant disruptions in your daily routines. Travel only if your trip is essential.';
            document.querySelector("#" + pojava + '_InstructionsBS_' + redni_broj).value = 'Poduzmite mjere, očekuju se ekstremno visoke temperature. Zaštitite sebe i pomozite ugroženim osobama. Djelujte u skladu sa savjetima ovlaštenih organa. Očekujte moguće kvarove u infrastrukturi.';
            document.querySelector("#" + pojava + '_InstructionsEN_' + redni_broj).value = 'Take necessary precautions for your safety, extremely high temperatures are expected. Protect yourself and help vulnerable people. Follow the advice of the authorities. Expect possible infrastructure failures.';
        } else if (pojava == 'LOW-TEMPERATURE') {
            document.querySelector("#" + pojava + '_ImpactBS_' + redni_broj).value = 'PODUZMITE MJERE. Ostanite na oprezu i pratite savjete nadležnih službi. Budite u toku sa aktuelnom vremenskom prognozom i očekujte značajna ometanja u dnevnim rutinama. Putujte samo ako je neophodno';
            document.querySelector("#" + pojava + '_ImpactEN_' + redni_broj).value = 'TAKE PRECAUTIONS. Stay alert and follow the advice given by the authorities. Stay up to date with the latest weather forecast and expect significant disruptions in your daily routines. Travel only if your trip is essential.';
            document.querySelector("#" + pojava + '_InstructionsBS_' + redni_broj).value = 'Poduzmite mjere, očekuju se ekstremno niske temperature. Zaštitite sebe i pomozite ugroženim osobama. Djelujte u skladu sa savjetima ovlaštenih organa. Očekujte moguće kvarove u infrastrukturi.';
            document.querySelector("#" + pojava + '_InstructionsEN_' + redni_broj).value = 'Take necessary precautions for your safety, extremely low temperatures are expected. Protect yourself and help vulnerable people. Follow the advice of the authorities. Expect possible infrastructure failures.';
        } else if (pojava == 'FOG') {
            document.querySelector("#" + pojava + '_ImpactBS_' + redni_broj).value = 'PODUZMITE MJERE. Ostanite na oprezu i pratite savjete nadležnih službi. Budite u toku sa aktuelnom vremenskom prognozom i očekujte značajna ometanja u dnevnim rutinama. Putujte samo ako je neophodno';
            document.querySelector("#" + pojava + '_ImpactEN_' + redni_broj).value = 'TAKE PRECAUTIONS. Stay alert and follow the advice given by the authorities. Stay up to date with the latest weather forecast and expect significant disruptions in your daily routines. Travel only if your trip is essential.';
            document.querySelector("#" + pojava + '_InstructionsBS_' + redni_broj).value = 'Poduzeti mjere da bi se zaštitili od široko rasprostranjene i izuzetno guste magle. Moguće zatvaranje glavnih aerodroma i brodskih luka. Veoma opasni uslovi za vožnju i visoko povećanje potrebnog vremena za putovanje na cestovnom i željezničkom saobraćaju.';
            document.querySelector("#" + pojava + '_InstructionsEN_' + redni_broj).value = 'Take necessary precautions for your safety from widespread and extremely dense fog. Possible closure of major airports and shipping ports. Very dangerous driving conditions and a high increase in the time required to travel by road and rail.';
        }
    } else {
        document.querySelector("#" + pojava + '_Action_' + redni_broj).value = 'None';
        document.querySelector("#" + pojava + '_DescriptionBS_' + redni_broj).value = '';
        document.querySelector("#" + pojava + '_DescriptionEN_' + redni_broj).value = '';
        document.querySelector("#" + pojava + '_ImpactBS_' + redni_broj).value = '';
        document.querySelector("#" + pojava + '_ImpactEN_' + redni_broj).value = '';
        document.querySelector("#" + pojava + '_InstructionsBS_' + redni_broj).value = '';
        document.querySelector("#" + pojava + '_InstructionsEN_' + redni_broj).value = '';
    }
}