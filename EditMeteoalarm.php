<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="./scripts/bh_meteoalarm_edit.css">
    <script type="text/javascript" src="Regioni.json"></script>
    <script type="text/javascript" src="Parametri.json"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script type="text/javascript" src="./scripts/bh_meteoalarm_edit_jQuery.js"></script>
    <script type="text/javascript" src="./scripts/bh_meteoalarm.js"></script>
    <title>EDIT-Meteoalarm</title>
</head>
<body scrolling="no">
    <script>
        "use strict";
    </script>
    <?php
		date_default_timezone_set('Europe/Sarajevo');
        $vrijeme=$_POST["vrijeme"];
        $upozorenje_za_dan=$_POST["time4post"];
    ?>
        <div class="EditMeteoalarmDIVLijeviCentralniDesni">
            <div class="EditMeteoalarmDIVLijevi">
                <div class="EditMeteoalarmDIVButton">
                    <input type="button" value="Parametri" id='selectParameter'>
                </div>
                <script>
                        let PARAMETRI=[];
                        $.ajax({
                            type: "get",
                            url: 'Parametri.json',
                            dataType: "json",
                            async: false,
                            success: function(data) {
                                PARAMETRI=data;
                            }
                        });
                        for([PARAM_ENG,PARAM_BOS] of PARAMETRI){
                            document.write("<div class='EditMeteoalarmDIVPojava'>");
                            document.write("<input type='radio' name='GumbPojava' id='"+PARAM_ENG+"_btn'>");
                            document.write("<label for='"+PARAM_ENG+"_btn'>"+PARAM_BOS+"<br>"+PARAM_ENG+"</label>");
                            document.write("</div>");
                        }
                        </script>
                <div class="EditMeteoalarmDIVButton">
                    <input type="button" value="Regioni" id="prikaz_regiona_btn" for_display="prikaz_regiona_div">
                </div>
                <div class="prikaz_regiona_checkboxes">
                    <script>
                        let REGIONI=[];
                        $.ajax({
                            type: "get",
                            url: 'Regioni.json',
                            dataType: "json",
                            async: false,
                            success: function(data) {
                                REGIONI=data;
                            }
                        });
                        for (let REG of REGIONI) {
                            document.write("<div class='EditMeteoalarmDIVRegion'>")
                            document.write("<input type='checkbox' name='prikaz_regiona_checkbox' id='edit_"+REG.id+"' for_display='prikaz_regiona_div'>");
                            document.write("<label for='edit_"+REG.id+"'>"+REG.name.toUpperCase()+"</label>");
                            document.write("</div>");
                        }
                        </script>
                </div>
                <div class="EditMeteoalarmDIVButton">
                    <input type="button" value="Unos" id="unos_upozorenja_btn" disabled for_display="prikaz_unosa_div">
                </div>
            </div>
            <div class="EditMeteoalarmDIVCentralni">
                <div id="prikaz_regiona_div" class="nevidljivo">
                    <iframe id="prikaz_regiona_iframe" src="karta.html" frameborder="0"></iframe>
                </div>
                <div id="prikaz_upozorenja_div" class="vidljivo">
                    <form method="post" action="">
                        <input type="text" value="<?php echo $upozorenje_za_dan;?>" id="upozorenje_za_dan" class="nevidljivo">
                    <script>
                        for([PARAM_ENG,PARAM_BOS] of PARAMETRI){
                            document.write("<div id='uneseni_"+PARAM_ENG+"_div' class='parametri_div'>"+PARAM_BOS+"</div>");
                        }
                    </script>
                    <input type="button" value="Prihvati Unos" disabled name="prihvati" id="prihvati">
                </form>
                </div>
                <div id="prikaz_unosa_div" class="nevidljivo"></div>
            </div>
            <div class="EditMeteoalarmDIVDesni">
                <div><h3>Unos za dan: <span><?php echo $vrijeme;?></span></h3></div>
                <div class="EditMeteoalarmDIVButton">
                    <input type="button" value="Prikaži Unosena Upozorenja" id="prikazi_unos_btn" for_display="prikaz_upozorenja_div">
                </div>
                <div class="EditMeteoalarmDIVButton">
                    <input type="button" value="Dodaj Unos" id="dodaj_unos_btn" disabled for_display="prikaz_upozorenja_div">
                </div>
                <div class="EditMeteoalarmDIVButton">
                    <input type="button" value="Otkaži Unos" id="otkazi_unos">
                </div>
            </div>
        </div>
</body>
</html>
