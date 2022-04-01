$(document).ready(function() {
    Date.prototype.addDays = function(days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    function dan_u_sedmici(broj) {
        let dan = ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"];
        return dan[broj];
    }
    //let JS_date = new Date();
    let trenutno_vrijeme = new Date();
    //let trenutno_vrijeme = new Date(JS_date.getFullYear(), JS_date.getMonth(), JS_date.getDate(), JS_date.getHours(), 0, 0, 0);
    let vremena = []
    for (let i = 0; i <= 5; i++) {
        vremena.push(trenutno_vrijeme.addDays(i));
    }
    class Clan_u_vremenu {
        constructor(clan) {
            this.clan = clan;
        }
        add_clan() {
            this.clan += 1;
            return this.clan;
        }
        substract_clan() {
            this.clan -= 1;
            return this.clan;
        }
    }
    trenutni_clan = new Clan_u_vremenu(0);
    upisPolja(vremena[trenutni_clan.clan]);

    function for_disable(dan) {
        let odgovor = [false, false];
        if (dan <= 0) odgovor[0] = true;
        else if (dan >= vremena.length - 1) odgovor[1] = true;
        return odgovor;
    }

    function upisPolja(vrijeme) {
        let date = new Date(vrijeme);
        let mjesec = date.getMonth() + 1;
        let za_upis = dan_u_sedmici(date.getDay()) + ", " + date.getDate() + "." + mjesec + "." + date.getFullYear();
        $("#time4post").val(date.toISOString().slice(0, 19) + "+0" + String((-1) * parseInt(date.getTimezoneOffset()) / 60) + ":00");
        $("#vrijeme").val(za_upis);
    }
    //funkcija za uvoz parametara i regiona
    PARAMETRI = [];
    $.ajax({
        type: "get",
        url: "Parametri.json",
        dataType: "json",
        success: function(data) {
            PARAMETRI = data;
        }
    });
    REGIONI = [];
    $.ajax({
        type: "get",
        url: "Regioni.json",
        dataType: "json",
        success: function(data) {
            REGIONI = data;
        }
    });
    //pozivanje funkcije za bojenje tabele i regiona pri ucitavanju stranice-za aktuelni dan
    $(window).on("load", function() {
        do_coloring(String(vremena[trenutni_clan.clan].getFullYear()) + String(vremena[trenutni_clan.clan].getMonth() + 1).padStart(2, "0") + String(vremena[trenutni_clan.clan].getDate()).padStart(2, "0"));
    });
    //funkcija za bojenje u tabeli i regiona
    function do_coloring(termin) {
        const colors = { "white": 0, "green": 0, "yellow": 1, "orange": 2, "red": 3 };
        const colors_reverse = { "0": "white", "1": "yellow", "2": "orange", "3": "red" };
        for (let REG of REGIONI) {
            $("#prikaz_regiona_iframe").contents().find("#karta_" + REG.id).css("fill", "white");
            for (let PAR of PARAMETRI) {
                $("#" + PAR[0] + "_" + REG.id).css("background-color", "white");
            }
        }
        $.ajax({
            type: "get",
            url: "./outputAPPfiles/" + termin.slice(4, 8) + ".json",
            dataType: "json",
            async: false,
            success: function(data) {
                if (data[termin]) {
                    for (let REG of REGIONI) {
                        let color_reg = 0;
                        for (let PAR of PARAMETRI) {
                            let color_par = 0;
                            for (i = 0; i < 7; i++) {
                                if (data[termin][PAR[0] + "_" + REG.id + "_" + i]) {
                                    if (colors[data[termin][PAR[0] + "_" + REG.id + "_" + i]["sadrzaj_upozorenja"][2]] > color_par) {
                                        color_par = colors[data[termin][PAR[0] + "_" + REG.id + "_" + i]["sadrzaj_upozorenja"][2]];
                                    }
                                    if (colors[data[termin][PAR[0] + "_" + REG.id + "_" + i]["sadrzaj_upozorenja"][2]] > color_reg) {
                                        color_reg = colors[data[termin][PAR[0] + "_" + REG.id + "_" + i]["sadrzaj_upozorenja"][2]];
                                    }
                                }
                            }
                            $("#" + PAR[0] + "_" + REG.id).css("background-color", colors_reverse[color_par]);
                        }
                        $("#prikaz_regiona_iframe").contents().find("#karta_" + REG.id).css("fill", colors_reverse[color_reg]);
                    }
                }
            }
        });
    }

    $("[value='>>'").click(function() {
        trenutni_clan.add_clan();
        upisPolja(vremena[trenutni_clan.clan]);
        let godina = vremena[trenutni_clan.clan].getFullYear();
        let mjesec = vremena[trenutni_clan.clan].getMonth() + 1;
        let datum = vremena[trenutni_clan.clan].getDate();
        $("[value='<<'").prop("disabled", for_disable(trenutni_clan.clan)[0]);
        $("[value='>>'").prop("disabled", for_disable(trenutni_clan.clan)[1]);
        do_coloring(String(godina) + String(mjesec).padStart(2, "0") + String(datum).padStart(2, "0"));
    });
    $("[value='<<'").click(function() {
        trenutni_clan.substract_clan();
        upisPolja(vremena[trenutni_clan.clan]);
        let godina = vremena[trenutni_clan.clan].getFullYear();
        let mjesec = vremena[trenutni_clan.clan].getMonth() + 1;
        let datum = vremena[trenutni_clan.clan].getDate();
        $("[value='<<'").prop("disabled", for_disable(trenutni_clan.clan)[0]);
        $("[value='>>'").prop("disabled", for_disable(trenutni_clan.clan)[1]);
        do_coloring(String(godina) + String(mjesec).padStart(2, "0") + String(datum).padStart(2, "0"));
    });

    $("[popover]").bind("click mouseenter mouseleave", function(event) {
        let region_id = $(this).attr("popover");
        if (event.type === "click") {
            let termin_ATOM = document.querySelector("#time4post").value;
            let termin_mmdd = termin_ATOM.slice(5, 7) + termin_ATOM.slice(8, 10);
            let termin_yyyymmdd = termin_ATOM.slice(0, 4) + termin_mmdd;
            $.ajax({
                type: "get",
                url: "./outputAPPfiles/" + termin_mmdd + ".json",
                dataType: "json",
                async: false,
                success: function(data) {
                    if (data[termin_yyyymmdd]) {
                        let target = document.querySelector("#upozorenja");
                        document.querySelector("#upozorenja").innerHTML = "";
                        let tabela = document.createElement("table");
                        tabela.setAttribute("border", "1px solid black");
                        tabela.setAttribute("width", "100%");
                        const tr_th = document.createElement("tr");
                        const ths = ["Region", "Pojava", "Level", "Start", "End", "Description"];
                        for (const th of ths) {
                            const th_new = document.createElement("th");
                            const th_new_content = document.createTextNode(th);
                            th_new.appendChild(th_new_content);
                            tr_th.appendChild(th_new);
                        }
                        tabela.appendChild(tr_th);
                        for (let PAR of PARAMETRI) {
                            for (let i = 0; i < 7; i++) {
                                if (data[termin_yyyymmdd][PAR[0] + "_" + region_id + "_" + String(i)]) {
                                    const tr = document.createElement("tr");
                                    for (let j = 0; j <= 5; j++) {
                                        const td = document.createElement("td");
                                        const td_content = document.createTextNode(data[termin_yyyymmdd][PAR[0] + "_" + region_id + "_" + String(i)]["sadrzaj_upozorenja"][j]);
                                        td.appendChild(td_content);
                                        tr.appendChild(td);
                                    }
                                    tabela.appendChild(tr);
                                }
                            }
                        }
                        target.appendChild(tabela);
                        $("#upozorenja").toggle();
                    }
                }
            });
        } else if (event.type === "mouseenter") {
            for (let REG of REGIONI) {
                $("#prikaz_regiona_iframe").contents().find("#karta_" + REG.id).css("stroke-width", "0px");
            }
            $("#prikaz_regiona_iframe").contents().find("#karta_" + region_id).css("stroke-width", "10px");
        } else if (event.type === "mouseleave") {
            for (let REG of REGIONI) {
                $("#prikaz_regiona_iframe").contents().find("#karta_" + REG.id).css("stroke-width", "5px");
            }
        }
    });
    $("#upozorenja").click(function() {
        $(this).hide();
    });
});