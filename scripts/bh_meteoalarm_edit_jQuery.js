$(document).ready(function() {
    //ucitavanje json regiona,parametara
    PARAMETRI = [];
    $.ajax({
        type: "get",
        url: "Parametri.json",
        dataType: "json",
        async: false,
        success: function(data) {
            PARAMETRI = data;
        }
    });
    REGIONI = [];
    $.ajax({
        type: "get",
        url: "Regioni.json",
        dataType: "json",
        async: false,
        success: function(data) {
            REGIONI = data;
        }
    });
    //obavijest da se parametar moze izabrati sa liste
    $("#selectParameter").click(function() {
        alert("Izaberite parametar sa liste");
    });
    //oznacavanje parametra
    $("[name='GumbPojava']").click(function() {
        enable_disable_gumbs();
        $("[name='GumbPojava']").prop("disabled", true);
        $("#selectParameter").prop("disabled", true);
        trenutni_id.reset_id();
        create_input_form(this.id.split("_")[0]);
    });
    //f-je koje se pokrecu prilikom klika na odredjenu tipku
    let for_display_lista = ["prikaz_regiona_div", "prikaz_unosa_div", "prikaz_upozorenja_div"];
    $("#prikaz_regiona_btn, input[name='prikaz_regiona_checkbox']").click(function() {
        for (let for_display of for_display_lista) {
            $("#" + for_display).removeClass("vidljivo").addClass("nevidljivo");
        }
        let display = $(this).attr("for_display");
        $("#" + display).removeClass("nevidljivo").addClass("vidljivo");
    });

    $("#unos_upozorenja_btn").click(function() {
        prikazi_unos_upozorenja();
    });

    function prikazi_unos_upozorenja() {
        for (let for_display of for_display_lista) {
            $("#" + for_display).removeClass("vidljivo").addClass("nevidljivo");
        }
        $("#prikaz_unosa_div").removeClass("nevidljivo").addClass("vidljivo");
        $("#prikaz_regiona_btn").prop("disabled", true);
        $("[name='prikaz_regiona_checkbox']").prop("disabled", true);
        $("#unos_upozorenja_btn").prop("disabled", true);
        $("#dodaj_unos_btn").prop("disabled", false);
    }

    $("#prikazi_unos_btn").click(function() {
        for (let for_display of for_display_lista) {
            $("#" + for_display).removeClass("vidljivo").addClass("nevidljivo");
        }
        let display = $(this).attr("for_display");
        $("#" + display).removeClass("nevidljivo").addClass("vidljivo");
        $("#unos_upozorenja_btn").prop("disabled", false);
    });
    $("#dodaj_unos_btn").click(function() {
        for (let for_display of for_display_lista) {
            $("#" + for_display).removeClass("vidljivo").addClass("nevidljivo");
        }
        let display = $(this).attr("for_display");
        $("#" + display).removeClass("nevidljivo").addClass("vidljivo");
        $("[name='GumbPojava']").prop("disabled", false);
        $("#selectParameter").prop("disabled", false);
        $("[name='prikaz_regiona_checkbox']").prop("disabled", false);
        $("#dodaj_unos_btn").prop("disabled", true);
        const oznaceni_parametar = document.querySelector("[name='GumbPojava']:checked").getAttribute("id").split("_")[0];
        const oznaceni_regioni1 = $("[name='prikaz_regiona_checkbox']:checked"); //array
        let oznaceni_regioni = [];
        for (let i = 0; i < oznaceni_regioni1.length; i++) {
            oznaceni_regioni.push(oznaceni_regioni1[i].id.slice(-3));
        }
        const array_const = ["Level", "Action", "Probability", "StartHour", "StartMinute", "EndHour", "EndMinute", "DescriptionBS", "DescriptionEN", "ImpactBS", "ImpactEN", "InstructionsBS", "InstructionsEN", "References"];
        let array_out = {};
        for (let element of array_const) {
            array_out[element] = {};
            const uneseni_elementi = $("[name='" + oznaceni_parametar + element + "']"); //array
            for (let i = 0; i < uneseni_elementi.length; i++) {
                array_out[element][uneseni_elementi[i].id.split("_")[2]] = uneseni_elementi[i].value;
            }
        }
        add_warnings({
            "selected_parameter": oznaceni_parametar,
            "selected_regions": oznaceni_regioni,
            "levels": array_out["Level"],
            "actions": array_out["Action"],
            "probabilities": array_out["Probability"],
            "start_hours": array_out["StartHour"],
            "start_minutes": array_out["StartMinute"],
            "end_hours": array_out["EndHour"],
            "end_minutes": array_out["EndMinute"],
            "descriptions_bs": array_out["DescriptionBS"],
            "descriptions_en": array_out["DescriptionEN"],
            "impacts_bs": array_out["ImpactBS"],
            "impacts_en": array_out["ImpactEN"],
            "instructions_bs": array_out["InstructionsBS"],
            "instructions_en": array_out["InstructionsEN"],
            "references": array_out["References"],
            "sent": "0"
        });
        for (PAR of PARAMETRI) {
            $("#" + PAR[0] + "_btn").prop("checked", false);
        }
        $("#prikaz_regiona_btn").prop("disabled", false);
        for (REG of REGIONI) {
            $("#edit_" + REG.id).prop("checked", false);
            $("#prikaz_regiona_iframe").contents().find("#karta_" + REG.id).removeClass("selected");
        }
    });

    //klasa za sufix id-ja pri dodavanju nove forme za unos
    class Select_id {
        constructor(id = 0) {
            this.id = id;
        }
        add_id() {
            this.id += 1;
            return this.id;
        }
        reset_id() {
            this.id = 0;
            return this.id;
        }
    }
    trenutni_id = new Select_id();

    //f-ja za kreiranje elementa za unos upozorenja
    function create_input_form(id_pojave) {
        let forbidden_keys = ["Enter", "<", ">", "&", "=", "\"", "'"];
        const target = document.querySelector("#prikaz_unosa_div");
        const main_div = document.createElement("div");
        main_div.setAttribute("class", "container");

        const div = [];
        for (let i = 1; i <= 6; i++) { //kreiranje divova
            div[i] = document.createElement("div");
            main_div.appendChild(div[i]);
        }
        //div1
        for (let i = 1; i <= 3; i++) { //kreiranje span za div[1]
            div[1][i] = document.createElement("span");
            div[1].appendChild(div[1][i]);
        }
        //span1
        const p11 = document.createElement("p");
        const p11_content = document.createTextNode("Awareness-level:");
        p11.appendChild(p11_content);
        div[1][1].appendChild(p11);
        const select11 = document.createElement("select");
        select11.setAttribute("id", id_pojave + "_Level_" + trenutni_id.id);
        select11.setAttribute("name", id_pojave + "Level");
        select11.setAttribute("style", "background-color:green");
        let pojave = ["green", "yellow", "orange", "red"];
        for (let pojava of pojave) {
            let opt11 = document.createElement("option");
            opt11.value = pojava;
            opt11.text = pojava;
            select11.appendChild(opt11);
        }
        select11.addEventListener("click", function() {
            warning_level_changed(this); //ova f-ja je u drugom js fajlu
        });
        div[1][1].appendChild(select11);
        //span2
        const p12 = document.createElement("p");
        const p12_content = document.createTextNode("Akcija:");
        p12.appendChild(p12_content);
        div[1][2].appendChild(p12);
        const select12 = document.createElement("select");
        select12.setAttribute("id", id_pojave + "_Action_" + trenutni_id.id);
        select12.setAttribute("name", id_pojave + "Action");
        select12.addEventListener("change", function() {
            provjera_unosa(this);
        });
        let actions = [
            ["None", "nije potrebna akcija (None)"],
            ["Shelter", "potražiti sklonište (Shelter)"],
            ["Avoid", "izbjegavati zahvaćena područja (Avoid)"],
            ["Monitor", "pratiti situaciju (Monitor)"]
        ];
        for (let action of actions) {
            let opt12 = document.createElement("option");
            opt12.value = action[0];
            opt12.text = action[1];
            select12.appendChild(opt12);
        }
        div[1][2].appendChild(select12);
        //span3
        const p13 = document.createElement("p");
        const p13_content = document.createTextNode("Vjerovatnoća:");
        p13.appendChild(p13_content);
        div[1][3].appendChild(p13);
        const select13 = document.createElement("select");
        select13.setAttribute("id", id_pojave + "_Probability_" + trenutni_id.id);
        select13.setAttribute("name", id_pojave + "Probability");
        let probabilities = [
            ["Likely", "veća od 50%"],
            ["Possible", "manja od 50%"],
        ];
        for (let probability of probabilities) {
            let opt13 = document.createElement("option");
            opt13.value = probability[0];
            opt13.text = probability[1];
            select13.appendChild(opt13);
        }
        div[1][3].appendChild(select13);
        //div2
        for (let i = 1; i <= 3; i++) { //kreiranje span za div[2]
            div[2][i] = document.createElement("span");
            div[2].appendChild(div[2][i]);
        }
        //span1
        const p21 = document.createElement("p");
        const p21_content = document.createTextNode("Start-time (sat:min):");
        p21.appendChild(p21_content);
        div[2][1].appendChild(p21);
        const select21 = document.createElement("select");
        select21.setAttribute("id", id_pojave + "_StartHour_" + trenutni_id.id);
        select21.setAttribute("name", id_pojave + "StartHour");
        select21.addEventListener("change", function() {
            provjera_unosa(this);
        });
        for (let sat = 0; sat <= 23; sat++) {
            let opt21 = document.createElement("option");
            opt21.value = String(sat).padStart(2, "0");
            opt21.text = String(sat).padStart(2, "0");
            if (parseInt(trenutni_id.id) > 0) {
                try {
                    let prethodni_sat = document.querySelector("#" + id_pojave + "_EndHour_" + String(parseInt(trenutni_id.id) - 1)).value;
                    if (sat == prethodni_sat) {
                        opt21.setAttribute("selected", "selected");
                    }
                } catch {};
            }
            select21.appendChild(opt21);
        }
        div[2][1].appendChild(select21);
        const p22 = document.createElement("p");
        const p22_content = document.createTextNode(":");
        p22.appendChild(p22_content);
        p22.setAttribute("class", "dvotacka");
        div[2][1].appendChild(p22);
        const select22 = document.createElement("select");
        select22.setAttribute("id", id_pojave + "_StartMinute_" + trenutni_id.id);
        select22.setAttribute("name", id_pojave + "StartMinute");
        for (let minut = 0; minut <= 59; minut++) {
            let opt22 = document.createElement("option");
            opt22.value = String(minut).padStart(2, "0");
            opt22.text = String(minut).padStart(2, "0");
            if (parseInt(trenutni_id.id) > 0) {
                try {
                    let prethodni_minut = document.querySelector("#" + id_pojave + "_EndMinute_" + String(parseInt(trenutni_id.id) - 1)).value;
                    if (minut == prethodni_minut) {
                        opt22.setAttribute("selected", "selected");
                    }
                } catch {};
            }
            select22.appendChild(opt22);
        }
        div[2][1].appendChild(select22);
        //span2
        const p23 = document.createElement("p");
        const p23_content = document.createTextNode("End-time (sat:min):");
        p23.appendChild(p23_content);
        div[2][2].appendChild(p23);
        const select23 = document.createElement("select");
        select23.setAttribute("id", id_pojave + "_EndHour_" + trenutni_id.id);
        select23.setAttribute("name", id_pojave + "EndHour");
        select23.addEventListener("change", function() {
            provjera_unosa(this);
        });
        for (let sat = 0; sat <= 23; sat++) {
            let opt23 = document.createElement("option");
            opt23.value = String(sat).padStart(2, "0");
            opt23.text = String(sat).padStart(2, "0");
            select23.appendChild(opt23);
        }
        select23.selectedIndex = "23";
        div[2][2].appendChild(select23);
        const p24 = document.createElement("p");
        const p24_content = document.createTextNode(":");
        p24.appendChild(p24_content);
        p24.setAttribute("class", "dvotacka");
        div[2][2].appendChild(p24);
        const select24 = document.createElement("select");
        select24.setAttribute("id", id_pojave + "_EndMinute_" + trenutni_id.id);
        select24.setAttribute("name", id_pojave + "EndMinute");
        for (let minut = 0; minut <= 59; minut++) {
            let opt24 = document.createElement("option");
            opt24.value = String(minut).padStart(2, "0");
            opt24.text = String(minut).padStart(2, "0");
            select24.appendChild(opt24);
        }
        select24.selectedIndex = "59";
        div[2][2].appendChild(select24);
        //span3
        const input21 = document.createElement("input");
        input21.setAttribute("id", id_pojave + "_References_" + trenutni_id.id);
        input21.setAttribute("name", id_pojave + "References");
        input21.setAttribute("type", "text");
        input21.setAttribute("class", "nevidljivo");
        div[2][3].appendChild(input21);
        //div3
        for (let i = 1; i <= 2; i++) { //kreiranje span za div[3]
            div[3][i] = document.createElement("span");
            div[3].appendChild(div[3][i]);
        }
        //span1
        const p31 = document.createElement("p");
        const p31_content = document.createTextNode("Description (LOKALNI JEZIK):");
        p31.appendChild(p31_content);
        div[3][1].appendChild(p31);
        const br31 = document.createElement("br");
        div[3][1].appendChild(br31);
        const input31 = document.createElement("input");
        input31.setAttribute("id", id_pojave + "_DescriptionBS_" + trenutni_id.id);
        input31.setAttribute("name", id_pojave + "DescriptionBS");
        input31.setAttribute("autocomplete", "off");
        input31.addEventListener("input", function() {
            provjera_unosa(this);
        });
        input31.addEventListener("keypress", function(event) { //ne dopusta Enter,<,>,&
            if (forbidden_keys.includes(event.key)) {
                event.preventDefault();
            }
        });
        div[3][1].appendChild(input31);
        //span2
        const p32 = document.createElement("p");
        const p32_content = document.createTextNode("Description (ENG):");
        p32.appendChild(p32_content);
        div[3][2].appendChild(p32);
        const br32 = document.createElement("br");
        div[3][2].appendChild(br32);
        const input32 = document.createElement("input");
        input32.setAttribute("id", id_pojave + "_DescriptionEN_" + trenutni_id.id);
        input32.setAttribute("name", id_pojave + "DescriptionEN");
        input32.setAttribute("autocomplete", "off");
        input32.addEventListener("input", function() {
            provjera_unosa(this);
        });
        input32.addEventListener("keypress", function(event) { //ne dopusta Enter,<,>,&
            if (forbidden_keys.includes(event.key)) {
                event.preventDefault();
            }
        });
        div[3][2].appendChild(input32);
        //div4
        for (let i = 1; i <= 2; i++) { //kreiranje span za div[4]
            div[4][i] = document.createElement("span");
            div[4].appendChild(div[4][i]);
        }
        //span1
        const p41 = document.createElement("p");
        const p41_content = document.createTextNode("Impact (LOKALNI JEZIK):");
        p41.appendChild(p41_content);
        div[4][1].appendChild(p41);
        const br41 = document.createElement("br");
        div[4][1].appendChild(br41);
        const textarea41 = document.createElement("textarea");
        textarea41.setAttribute("id", id_pojave + "_ImpactBS_" + trenutni_id.id);
        textarea41.setAttribute("name", id_pojave + "ImpactBS");
        textarea41.setAttribute("autocomplete", "off");
        textarea41.addEventListener("input", function() {
            provjera_unosa(this);
        });
        textarea41.addEventListener("keypress", function(event) { //ne dopusta Enter,<,>,&
            if (forbidden_keys.includes(event.key)) {
                event.preventDefault();
            }
        });
        div[4][1].appendChild(textarea41);
        //span2
        const p42 = document.createElement("p");
        const p42_content = document.createTextNode("Impact (ENG):");
        p42.appendChild(p42_content);
        div[4][2].appendChild(p42);
        const br42 = document.createElement("br");
        div[4][2].appendChild(br42);
        const textarea42 = document.createElement("textarea");
        textarea42.setAttribute("id", id_pojave + "_ImpactEN_" + trenutni_id.id);
        textarea42.setAttribute("name", id_pojave + "ImpactEN");
        textarea42.setAttribute("autocomplete", "off");
        textarea42.addEventListener("input", function() {
            provjera_unosa(this);
        });
        textarea42.addEventListener("keypress", function(event) { //ne dopusta Enter
            if (forbidden_keys.includes(event.key)) {
                event.preventDefault();
            }
        });
        div[4][2].appendChild(textarea42);
        //div5
        for (let i = 1; i <= 2; i++) { //kreiranje span za div[5]
            div[5][i] = document.createElement("span");
            div[5].appendChild(div[5][i]);
        }
        //span1
        const p51 = document.createElement("p");
        const p51_content = document.createTextNode("Instructions (LOKALNI JEZIK):");
        p51.appendChild(p51_content);
        div[5][1].appendChild(p51);
        const br51 = document.createElement("br");
        div[5][1].appendChild(br51);
        const textarea51 = document.createElement("textarea");
        textarea51.setAttribute("id", id_pojave + "_InstructionsBS_" + trenutni_id.id);
        textarea51.setAttribute("name", id_pojave + "InstructionsBS");
        textarea51.setAttribute("autocomplete", "off");
        textarea51.addEventListener("input", function() {
            provjera_unosa(this);
        });
        textarea51.addEventListener("keypress", function(event) { //ne dopusta Enter
            if (forbidden_keys.includes(event.key)) {
                event.preventDefault();
            }
        });
        div[5][1].appendChild(textarea51);
        //span2
        const p52 = document.createElement("p");
        const p52_content = document.createTextNode("Instructions (ENG):");
        p52.appendChild(p52_content);
        div[5][2].appendChild(p52);
        const br52 = document.createElement("br");
        div[5][2].appendChild(br52);
        const textarea52 = document.createElement("textarea");
        textarea52.setAttribute("id", id_pojave + "_InstructionsEN_" + trenutni_id.id);
        textarea52.setAttribute("name", id_pojave + "InstructionsEN");
        textarea52.setAttribute("autocomplete", "off");
        textarea52.addEventListener("input", function() {
            provjera_unosa(this);
        });
        textarea52.addEventListener("keypress", function(event) { //ne dopusta Enter
            if (forbidden_keys.includes(event.key)) {
                event.preventDefault();
            }
        });
        div[5][2].appendChild(textarea52);
        //div6
        div[6][1] = document.createElement("span");
        div[6].appendChild(div[6][1]);
        const input61 = document.createElement("input");
        input61.setAttribute("type", "button");
        input61.setAttribute("id", "addNewWarningForm_" + trenutni_id.id);
        input61.setAttribute("value", "+");
        input61.addEventListener("click", function() {
            add_new_input_warning_form(this.id);
        });
        div[6][1].appendChild(input61);
        trenutni_id.add_id();
        target.appendChild(main_div);
    }
    //funkcija za dodavanje nove forme za unos
    function add_new_input_warning_form(gumb_id) {
        $("#" + gumb_id).prop("disabled", true);
        let id = $("[name='GumbPojava']:checked").attr("id").split("_")[0];
        create_input_form(id);
    }
    //enable tipki Unos i PrihvatiUnos
    function enable_disable_gumbs() {
        let duzina = $("input[name='prikaz_regiona_checkbox']:checked").length;
        if ($("[name='GumbPojava']").is(":checked") && duzina > 0) {
            $("#unos_upozorenja_btn").prop("disabled", false);
        } else {
            $("#unos_upozorenja_btn").prop("disabled", true);
        }
    }
    //f-ja za sortiranje tabele
    function sort_table(element_th) {
        let parametar = element_th.split("_")[0];
        let table = document.querySelector("#" + parametar + "_table");
        let switching = true;
        while (switching) {
            switching = false;
            rows = table.rows;
            if (rows.length > 2) {
                for (let i = 1; i < (rows.length - 1); i++) { //ide od 1 zbog th, do rows.lenght-1 zbog toga sto se ne sortira zadnji red
                    let shouldSwitch = false;
                    let x = rows[i].getElementsByTagName("td")[0];
                    let y = rows[i + 1].getElementsByTagName("td")[0];
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        if (shouldSwitch) {
                            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                            switching = true;
                        }
                        break;
                    }
                }
            }
        }
    }
    //dodavanje unesenih upozorenja
    function add_warnings(arg_object) {
        const oznaceni_parametar = arg_object["selected_parameter"];
        const oznaceni_regioni = arg_object["selected_regions"];
        const target = document.querySelector("#uneseni_" + oznaceni_parametar + "_div");
        let th_for_table = ["Region", "Parametar", "Level", "Start-time", "End-time", "Description", "EDIT", "DescriptionENG", "Action", "Probability", "Impact", "ImpactENG", "Instructions", "InstructionsENG", "References", "Sent"];
        if (target.children.length == 0) {
            tabela = document.createElement("table");
            target.appendChild(tabela);
            tabela.setAttribute("id", oznaceni_parametar + "_table");
            const tr0 = document.createElement("tr");
            let i = 0;
            tabela.appendChild(tr0);
            for (let th of th_for_table) {
                const th0 = document.createElement("th");
                const th_content = document.createTextNode(th);
                th0.appendChild(th_content);
                if (i > 6 || i == 1) {
                    th0.classList.add("nevidljivo");
                }
                if (i == 0) {
                    th0.setAttribute("scope", "col");
                    const span = document.createElement("span");
                    span.innerHTML = "&#9660;";
                    span.setAttribute("style", "background-color:white;float:right;border:2px solid black;cursor:pointer;");
                    span.addEventListener("click", function() {
                        sort_table(oznaceni_parametar + "_th");
                    });
                    th0.appendChild(span);
                }
                tr0.appendChild(th0);
                i += 1
            }
        }
        for (let REG of REGIONI) {
            for (let oznaceni_region of oznaceni_regioni) {
                if (REG.id == oznaceni_region) {
                    for (let nivo = 0; nivo < 7; nivo++) {
                        if (arg_object["levels"][nivo]) {
                            tabela = document.querySelector("#" + oznaceni_parametar + "_table");
                            let row = tabela.insertRow(tabela.rows.length);
                            row.setAttribute("id", oznaceni_parametar + "_" + REG.id + "_" + nivo);
                            for (let i = 0; i < th_for_table.length; i++) {
                                let cell = row.insertCell(i);
                                if (i != 6) {
                                    const input = document.createElement("input");
                                    input.setAttribute("id", oznaceni_parametar + "_" + REG.id + "_" + nivo + "_" + String(i));
                                    input.setAttribute("class", "nevidljivo");
                                    cell.appendChild(input);
                                }
                                if (i > 6 || i == 1) cell.classList.add("nevidljivo");
                                if (i == 0) {
                                    cell.innerHTML += REG.name;
                                    cell.setAttribute("style", "background-color:" + REG.html_bg_color + ";");
                                    document.querySelector("#" + oznaceni_parametar + "_" + REG.id + "_" + nivo + "_" + String(i)).value = REG.name;
                                } else if (i == 1) {
                                    cell.innerHTML += oznaceni_parametar;
                                    document.querySelector("#" + oznaceni_parametar + "_" + REG.id + "_" + nivo + "_" + String(i)).value = oznaceni_parametar;
                                } else if (i == 2) {
                                    let level = arg_object["levels"][nivo];
                                    cell.innerHTML += level;
                                    cell.setAttribute("style", "color:" + level);
                                    document.querySelector("#" + oznaceni_parametar + "_" + REG.id + "_" + nivo + "_" + String(i)).value = level;
                                } else if (i == 3) {
                                    let vrijeme_start = arg_object["start_hours"][nivo] + ":" + arg_object["start_minutes"][nivo];
                                    cell.innerHTML += vrijeme_start;
                                    document.querySelector("#" + oznaceni_parametar + "_" + REG.id + "_" + nivo + "_" + String(i)).value = vrijeme_start;
                                } else if (i == 4) {
                                    let vrijeme_end = arg_object["end_hours"][nivo] + ":" + arg_object["end_minutes"][nivo];
                                    cell.innerHTML += vrijeme_end;
                                    document.querySelector("#" + oznaceni_parametar + "_" + REG.id + "_" + nivo + "_" + String(i)).value = vrijeme_end;
                                } else if (i == 5) {
                                    let opisBS = arg_object["descriptions_bs"][nivo];
                                    cell.innerHTML += opisBS;
                                    document.querySelector("#" + oznaceni_parametar + "_" + REG.id + "_" + nivo + "_" + String(i)).value = opisBS;
                                } else if (i == 6) {
                                    const edit_btn = document.createElement("input");
                                    const atributtes = [
                                        ["type", "button"],
                                        ["class", "edit_btn"],
                                        ["value", "edit"],
                                        ["id", oznaceni_parametar + "_" + REG.id + "_" + nivo + "_" + String(i)]
                                    ];
                                    for ([attr1, attr2] of atributtes) {
                                        edit_btn.setAttribute(attr1, attr2);
                                    }
                                    edit_btn.addEventListener("click", function() {
                                        edit_warning(this);
                                    });
                                    cell.appendChild(edit_btn);
                                } else if (i == 7) {
                                    document.querySelector("#" + oznaceni_parametar + "_" + REG.id + "_" + nivo + "_" + String(i)).value = arg_object["descriptions_en"][nivo];
                                } else if (i == 8) {
                                    document.querySelector("#" + oznaceni_parametar + "_" + REG.id + "_" + nivo + "_" + String(i)).value = arg_object["actions"][nivo];
                                } else if (i == 9) {
                                    document.querySelector("#" + oznaceni_parametar + "_" + REG.id + "_" + nivo + "_" + String(i)).value = arg_object["probabilities"][nivo];
                                } else if (i == 10) {
                                    document.querySelector("#" + oznaceni_parametar + "_" + REG.id + "_" + nivo + "_" + String(i)).value = arg_object["impacts_bs"][nivo];
                                } else if (i == 11) {
                                    document.querySelector("#" + oznaceni_parametar + "_" + REG.id + "_" + nivo + "_" + String(i)).value = arg_object["impacts_en"][nivo];
                                } else if (i == 12) {
                                    document.querySelector("#" + oznaceni_parametar + "_" + REG.id + "_" + nivo + "_" + String(i)).value = arg_object["instructions_bs"][nivo];
                                } else if (i == 13) {
                                    document.querySelector("#" + oznaceni_parametar + "_" + REG.id + "_" + nivo + "_" + String(i)).value = arg_object["instructions_en"][nivo];
                                } else if (i == 14) {
                                    document.querySelector("#" + oznaceni_parametar + "_" + REG.id + "_" + nivo + "_" + String(i)).value = arg_object["references"][nivo];
                                } else if (i == 15) {
                                    document.querySelector("#" + oznaceni_parametar + "_" + REG.id + "_" + nivo + "_" + String(i)).value = arg_object["sent"];
                                }
                            }
                        }
                    }
                }
            }
        }
        document.querySelector("[name='prihvati']").disabled = false;
        //document.querySelector("#prikaz_regiona_btn").disabled = false;
        document.querySelector("#prikaz_unosa_div").innerHTML = "";
    }
    //korekcija upozorenja
    function edit_warning(element) {
        let id = element.getAttribute("id");
        let parametar = id.split("_")[0];
        let region_id = id.split("_")[1];
        let broj_unosa = id.split("_")[2];
        trenutni_id.id = broj_unosa;
        for (let PAR of PARAMETRI) {
            document.querySelector("#" + PAR[0] + "_btn").disabled = true;
        }
        document.querySelector("#selectParameter").disabled = true;
        document.querySelector("#" + parametar + "_btn").disabled = false;
        document.querySelector("#" + parametar + "_btn").checked = true;

        for (let REG of REGIONI) {
            document.querySelector("#edit_" + REG.id).disabled = true;
        }
        document.querySelector("#edit_" + region_id).disabled = false;
        document.querySelector("#edit_" + region_id).checked = true;
        document.querySelector("#prikaz_regiona_btn").disabled = true;
        document.querySelector("#" + parametar + "_" + region_id + "_" + broj_unosa + "_15").value = "0";
        create_input_form(parametar);
        for (let i = 0; i <= 14; i++) {
            let vrijednost = document.querySelector("#" + parametar + "_" + region_id + "_" + broj_unosa + "_" + i).value;
            if (i == 0 || i == 1 || i == 6) {
                continue
            } else if (i == 2) {
                document.querySelector("#" + parametar + "_Level_" + broj_unosa).value = vrijednost;
                document.querySelector("#" + parametar + "_Level_" + broj_unosa).style.backgroundColor = vrijednost;
            } else if (i == 3) {
                document.querySelector("#" + parametar + "_StartHour_" + broj_unosa).value = vrijednost.split(":")[0];
                document.querySelector("#" + parametar + "_StartMinute_" + broj_unosa).value = vrijednost.split(":")[1];
            } else if (i == 4) {
                document.querySelector("#" + parametar + "_EndHour_" + broj_unosa).value = vrijednost.split(":")[0];
                document.querySelector("#" + parametar + "_EndMinute_" + broj_unosa).value = vrijednost.split(":")[1];
            } else if (i == 5) {
                document.querySelector("#" + parametar + "_DescriptionBS_" + broj_unosa).value = vrijednost;
            } else if (i == 7) {
                document.querySelector("#" + parametar + "_DescriptionEN_" + broj_unosa).value = vrijednost;
            } else if (i == 8) {
                document.querySelector("#" + parametar + "_Action_" + broj_unosa).value = vrijednost;
            } else if (i == 9) {
                document.querySelector("#" + parametar + "_Probability_" + broj_unosa).value = vrijednost;
            } else if (i == 10) {
                document.querySelector("#" + parametar + "_ImpactBS_" + broj_unosa).value = vrijednost;
            } else if (i == 11) {
                document.querySelector("#" + parametar + "_ImpactEN_" + broj_unosa).value = vrijednost;
            } else if (i == 12) {
                document.querySelector("#" + parametar + "_InstructionsBS_" + broj_unosa).value = vrijednost;
            } else if (i == 13) {
                document.querySelector("#" + parametar + "_InstructionsEN_" + broj_unosa).value = vrijednost;
            } else if (i == 14) {
                document.querySelector("#" + parametar + "_References_" + broj_unosa).value = vrijednost;
            }
        }
        document.querySelector("#addNewWarningForm_" + broj_unosa).disabled = true;
        document.querySelector("#" + parametar + "_" + region_id + "_" + broj_unosa).remove();
        document.querySelector("[name='prihvati']").disabled = false;
        prikazi_unos_upozorenja();
    }

    //oznacavanje regiona
    $("[name='prikaz_regiona_checkbox']").click(function() { //oznacavanje regiona sa liste
        let checked_region = String(this.id).split("_")[1];
        if ($("#" + this.id).is(":checked")) {
            $("#prikaz_regiona_iframe").contents().find("#karta_" + checked_region).addClass("selected");
        } else {
            $("#prikaz_regiona_iframe").contents().find("#karta_" + checked_region).removeClass("selected");
        }
        enable_disable_gumbs();
    });
    $("#prikaz_regiona_iframe").on("load", function() { //oznacavanje regiona iz iframe
        $("#prikaz_regiona_iframe").contents().find("[name='karta_prikaz_regiona']").click(function() {
            let selected_element = String(this.id).split("_")[1];
            if ($("#prikaz_regiona_iframe").contents().find("#" + this.id).hasClass("selected")) {
                $("#prikaz_regiona_iframe").contents().find("#" + this.id).removeClass("selected");
                $("#edit_" + selected_element).prop("checked", false);
            } else {
                $("#prikaz_regiona_iframe").contents().find("#" + this.id).addClass("selected");
                $("#edit_" + selected_element).prop("checked", true);
            }
            enable_disable_gumbs();
        });
    });
    //pozivanje php f-je za kreiranje fajlova
    $("#prihvati").click(function() {
        let data_for_php = {};
        let vrijeme = new Date();
        let vrijeme_ATOM = vrijeme.getFullYear() + "-" + String(vrijeme.getMonth() + 1).padStart(2, "0") + "-" + String(vrijeme.getDate()).padStart(2, "0") + "T" + String(vrijeme.getHours()).padStart(2, "0") + ":" + String(vrijeme.getMinutes()).padStart(2, "0") + ":" + String(vrijeme.getSeconds()).padStart(2, "0") + "+" + String((-1) * parseInt(vrijeme.getTimezoneOffset()) / 60).padStart(2, "0") + ":00";
        let vrijeme4identifier = String(vrijeme.getFullYear()).slice(2) + String(vrijeme.getMonth() + 1).padStart(2, "0") + String(vrijeme.getDate()).padStart(2, "0") + String(vrijeme.getHours()).padStart(2, "0") + String(vrijeme.getMinutes()).padStart(2, "0") + String(vrijeme.getSeconds()).padStart(2, "0");
        for ([PARAM_ENG, PARAM_BOS] of PARAMETRI) {
            for (let REG of REGIONI) {
                for (let i = 0; i < 7; i++) { //moze biti uneseno 7 upozorenja za region po parametru
                    if ($("#" + PARAM_ENG + "_" + REG.id + "_" + String(i) + "_0").length != 0) {
                        let tmp_data = [];
                        let unique_identifier = String(Math.floor(Math.random() * 88888888 + 88888888)).padStart(8, "1");
                        let reference = REG.sender + "," + REG.center + ".BA." + vrijeme4identifier + "." + unique_identifier + "," + vrijeme_ATOM;
                        let old_reference = "";
                        if ($("#" + PARAM_ENG + "_" + REG.id + "_" + String(i) + "_14").val().length == 0) {
                            if ($("#" + PARAM_ENG + "_" + REG.id + "_" + String(i) + "_2").val() == "green") {
                                reference = "";
                            }
                            $("#" + PARAM_ENG + "_" + REG.id + "_" + String(i) + "_14").val(reference);
                        } else {
                            old_reference = $("#" + PARAM_ENG + "_" + REG.id + "_" + String(i) + "_14").val();
                            $("#" + PARAM_ENG + "_" + REG.id + "_" + String(i) + "_14").val(old_reference + " " + reference);
                        }
                        for (let j = 0; j <= 15; j++) {
                            if (j != 6) {
                                tmp_data.push($("#" + PARAM_ENG + "_" + REG.id + "_" + String(i) + "_" + String(j)).val());
                            } else {
                                tmp_data.push("NULL");
                            }
                        }
                        data_for_php[PARAM_ENG + "_" + REG.id + "_" + String(i)] = { "creation_time": vrijeme_ATOM, "upozorenje_za_dan": $("#upozorenje_za_dan").val(), "identifier": REG.center + ".BA." + vrijeme4identifier + "." + unique_identifier, "references": old_reference, "sadrzaj_upozorenja": tmp_data };
                    }
                }
            }
        }
        $.ajax({
            type: "POST",
            url: "warning_creation.php",
            data: data_for_php,
            success: function() {
                alert("Fajlovi za upozorenja su kreirani");
                $("#prihvati").prop("disabled", true);
                for ([PARAM_ENG, PARAM_BOS] of PARAMETRI) {
                    for (let REG of REGIONI) {
                        for (let i = 0; i < 7; i++) {
                            if ($("#" + PARAM_ENG + "_" + REG.id + "_" + String(i) + "_0").length != 0) {
                                $("#" + PARAM_ENG + "_" + REG.id + "_" + String(i) + "_15").val("1");
                            }
                        }
                    }
                }
            },
            error: function() {
                alert("Došlo je do greške u kreiranju fajlova. Fajlovi nisu kreirani");
            }
        });
        window.location.replace("ViewMeteoalarm.php");
    });
    //otkazivanje unosa
    $("#otkazi_unos").click(function() {
        window.location.replace("ViewMeteoalarm.php");
        //ovdje jos treba izbrisati sve sto je eventualno uneseno
    });
    //kreiranje tabele sa upozorenjima ako ima odgovarajuceg fajla
    $(window).on("load", function() {
        let termin_ATOM = document.querySelector("#upozorenje_za_dan").value;
        let termin_mmdd = termin_ATOM.slice(5, 7) + termin_ATOM.slice(8, 10);
        let termin_yyyymmdd = termin_ATOM.slice(0, 4) + termin_mmdd;
        for (let PAR of PARAMETRI) {
            document.querySelector("#uneseni_" + PAR[0] + "_div").innerHTML = PAR[1];
        }
        $.ajax({
            type: "get",
            url: "./outputAPPfiles/" + termin_mmdd + ".json",
            dataType: "json",
            async: false,
            success: function(data) {
                if (data[termin_yyyymmdd]) {
                    const array_keys = ["Level", "Action", "Probability", "StartHour", "StartMinute", "EndHour", "EndMinute", "DescriptionBS", "DescriptionEN", "ImpactBS", "ImpactEN", "InstructionsBS", "InstructionsEN", "References", "Poslato"];
                    for (let PAR of PARAMETRI) {
                        let array_out = {};
                        let oznaceni_parametar = PAR[0];
                        let oznaceni_regioni = [];
                        for (let REG of REGIONI) {
                            oznaceni_regioni = [REG.id];
                            for (let element of array_keys) {
                                array_out[element] = [];
                            }
                            for (let i = 0; i < 7; i++) {
                                if (data[termin_yyyymmdd][PAR[0] + "_" + REG.id + "_" + String(i)]) {
                                    array_out["Level"].push(data[termin_yyyymmdd][PAR[0] + "_" + REG.id + "_" + String(i)]["sadrzaj_upozorenja"][2]);
                                    array_out["Action"].push(data[termin_yyyymmdd][PAR[0] + "_" + REG.id + "_" + String(i)]["sadrzaj_upozorenja"][8]);
                                    array_out["Probability"].push(data[termin_yyyymmdd][PAR[0] + "_" + REG.id + "_" + String(i)]["sadrzaj_upozorenja"][9]);
                                    array_out["StartHour"].push(data[termin_yyyymmdd][PAR[0] + "_" + REG.id + "_" + String(i)]["sadrzaj_upozorenja"][3].slice(0, 2));
                                    array_out["StartMinute"].push(data[termin_yyyymmdd][PAR[0] + "_" + REG.id + "_" + String(i)]["sadrzaj_upozorenja"][3].slice(-2));
                                    array_out["EndHour"].push(data[termin_yyyymmdd][PAR[0] + "_" + REG.id + "_" + String(i)]["sadrzaj_upozorenja"][4].slice(0, 2));
                                    array_out["EndMinute"].push(data[termin_yyyymmdd][PAR[0] + "_" + REG.id + "_" + String(i)]["sadrzaj_upozorenja"][4].slice(-2));
                                    array_out["DescriptionBS"].push(data[termin_yyyymmdd][PAR[0] + "_" + REG.id + "_" + String(i)]["sadrzaj_upozorenja"][5]);
                                    array_out["DescriptionEN"].push(data[termin_yyyymmdd][PAR[0] + "_" + REG.id + "_" + String(i)]["sadrzaj_upozorenja"][7]);
                                    array_out["ImpactBS"].push(data[termin_yyyymmdd][PAR[0] + "_" + REG.id + "_" + String(i)]["sadrzaj_upozorenja"][10]);
                                    array_out["ImpactEN"].push(data[termin_yyyymmdd][PAR[0] + "_" + REG.id + "_" + String(i)]["sadrzaj_upozorenja"][11]);
                                    array_out["InstructionsBS"].push(data[termin_yyyymmdd][PAR[0] + "_" + REG.id + "_" + String(i)]["sadrzaj_upozorenja"][12]);
                                    array_out["InstructionsEN"].push(data[termin_yyyymmdd][PAR[0] + "_" + REG.id + "_" + String(i)]["sadrzaj_upozorenja"][13]);
                                    array_out["References"].push(data[termin_yyyymmdd][PAR[0] + "_" + REG.id + "_" + String(i)]["sadrzaj_upozorenja"][14]);
                                    array_out["Poslato"].push("1");
                                }
                            }
                            if (array_out["Level"].length > 0) {
                                add_warnings({
                                    "selected_parameter": oznaceni_parametar,
                                    "selected_regions": oznaceni_regioni,
                                    "levels": array_out["Level"],
                                    "actions": array_out["Action"],
                                    "probabilities": array_out["Probability"],
                                    "start_hours": array_out["StartHour"],
                                    "start_minutes": array_out["StartMinute"],
                                    "end_hours": array_out["EndHour"],
                                    "end_minutes": array_out["EndMinute"],
                                    "descriptions_bs": array_out["DescriptionBS"],
                                    "descriptions_en": array_out["DescriptionEN"],
                                    "impacts_bs": array_out["ImpactBS"],
                                    "impacts_en": array_out["ImpactEN"],
                                    "instructions_bs": array_out["InstructionsBS"],
                                    "instructions_en": array_out["InstructionsEN"],
                                    "references": array_out["References"],
                                    "sent": "1"
                                });
                            }
                        }
                    }
                }
            }
        });
    });
});