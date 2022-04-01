<?php
    date_default_timezone_set('Europe/Sarajevo');
    //meta_start
    $actual_datetime=new DateTime();
    $severity=array("green"=>"Minor","yellow"=>"Moderate","orange"=>"Severe","red"=>"Extreme");
    $number_of_levels=array("green"=>"1","yellow"=>"2","orange"=>"3","red"=>"4");
    $number_of_types=array("WIND"=>"1","RAIN"=>"10","SNOW-ICE"=>"2","THUNDERSTORM"=>"3","HIGH-TEMPERATURE"=>"5","LOW-TEMPERATURE"=>"6","FOG"=>"4");
    $name_of_types=array("WIND"=>"Wind","RAIN"=>"Rain","SNOW-ICE"=>"snow-ice","THUNDERSTORM"=>"Thunderstorm","HIGH-TEMPERATURE"=>"high-temperature","LOW-TEMPERATURE"=>"low-temperature","FOG"=>"Fog");
    $parameter_translation=array("WIND"=>"vjetar","RAIN"=>"kiša","SNOW-ICE"=>"snijeg-led","THUNDERSTORM"=>"grmljavina","HIGH-TEMPERATURE"=>"visoka temperatura","LOW-TEMPERATURE"=>"niska temperatura","FOG"=>"magla");
    $color_translation=array("green"=>"zeleno","yellow"=>"žuto","orange"=>"narandžasto","red"=>"crveno");
    //meta_end
    $file_content=file_get_contents("Parametri.json");
    $parametri_json_object=json_decode($file_content);//procitani parametri kao associative array
    $file_content=file_get_contents("Regioni.json");
    $regioni_json_object=json_decode($file_content);//procitani regioni kao associative array
    $REG_NAME=array();
    $REG_ID=array();
    $REG_CAP_POINTS=array();
    $REG_INSTITUTION=array();
    $REG_NMS_URL=array();
    $REG_SENDER=array();
    $REG_CENTER=array();
    foreach($regioni_json_object as $regioni_array){
        foreach($regioni_array as $kljuc=>$value){
            if($kljuc=="id"){
                array_push($REG_ID,$value);
            }else if($kljuc=="name"){
                array_push($REG_NAME,$value);
            }else if($kljuc=="cap_points"){
                array_push($REG_CAP_POINTS,$value);
            }else if($kljuc=="institution"){
                array_push($REG_INSTITUTION,$value);
            }else if($kljuc=="nms_url"){
                array_push($REG_NMS_URL,$value);
            }else if($kljuc=="sender"){
                array_push($REG_SENDER,$value);
            }else if($kljuc=="center"){
                array_push($REG_CENTER,$value);
            }
        }
    }
    unset($regioni_array,$kljuc,$value);
    $json_APP=array();
    foreach($parametri_json_object as $parametar){
        for($reg_index=0;$reg_index<count($REG_ID);$reg_index++){
            for($i=0;$i<7;$i++){
                $warning_date=$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["upozorenje_za_dan"];
                if(isset($_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i])){
                    $json_APP[substr($warning_date,0,4).substr($warning_date,5,2).substr($warning_date,8,2)][$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["identifier"]=$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["identifier"];
                    $json_APP[substr($warning_date,0,4).substr($warning_date,5,2).substr($warning_date,8,2)][$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["references"]=$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["references"];
                    $json_APP[substr($warning_date,0,4).substr($warning_date,5,2).substr($warning_date,8,2)][$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"]=[];
                    for($j=0;$j<=15;$j++){
                        array_push($json_APP[substr($warning_date,0,4).substr($warning_date,5,2).substr($warning_date,8,2)][$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"],$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][$j]);
                    }
                    if($_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][15]==0){
                        if(strlen($_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["references"])==0){
                            if($_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]!="green"){
                                $rnd=rand(10,99);
                                $file_pointer_CAP=fopen("./outputCAPfiles/BA_".substr($_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["identifier"],17,6)."_".substr($_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["identifier"],23,6)."_".$REG_ID[$reg_index].$number_of_types[$parametar[0]].$i.$rnd.".xml","w");
                                fwrite($file_pointer_CAP,"<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n");
                                fwrite($file_pointer_CAP,"<alert xmlns=\"urn:oasis:names:tc:emergency:cap:1.2\">\n");
                                fwrite($file_pointer_CAP,"<identifier>".$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["identifier"]."</identifier>\n");
                                fwrite($file_pointer_CAP,"<sender>".$REG_SENDER[$reg_index]."</sender>\n");
                                fwrite($file_pointer_CAP,"<sent>".$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["creation_time"]."</sent>\n");
                                fwrite($file_pointer_CAP,"<status>Actual</status>\n");
                                fwrite($file_pointer_CAP,"<msgType>Alert</msgType>\n");
                                fwrite($file_pointer_CAP,"<scope>Public</scope>\n");
                                //engleski
                                fwrite($file_pointer_CAP,"<info>\n");
                                fwrite($file_pointer_CAP,"<language>en</language>\n");
                                fwrite($file_pointer_CAP,"<category>Met</category>\n");
                                fwrite($file_pointer_CAP,"<event>".ucfirst(strtolower($parametar[0]))." ".ucfirst(strtolower($_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]))." Warning</event>\n");
                                fwrite($file_pointer_CAP,"<responseType>".$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][8]."</responseType>\n");
                                fwrite($file_pointer_CAP,"<urgency>Future</urgency>\n");
                                fwrite($file_pointer_CAP,"<severity>".$severity[$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]]."</severity>\n");
                                fwrite($file_pointer_CAP,"<certainty>".$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][9]."</certainty>\n");
                                fwrite($file_pointer_CAP,"<effective>".$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["creation_time"]."</effective>\n");
                                $start_datetime=new DateTime(substr($warning_date,0,11).$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][3].":00".substr($warning_date,19,-1));
                                fwrite($file_pointer,"<onset>".$start_datetime->format('Y-m-d\TH:i:sP')."</onset>\n");
                                $end_datetime=new DateTime(substr($warning_date,0,11).$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][4].":00".substr($warning_date,19,-1));
                                fwrite($file_pointer_CAP,"<expires>".$end_datetime->format('Y-m-d\TH:i:sP')."</expires>\n");
                                fwrite($file_pointer_CAP,"<senderName>".$REG_INSTITUTION[$reg_index][1]."</senderName>\n");
                                fwrite($file_pointer_CAP,"<headline>".ucfirst(strtolower($parametar[0]))." ".ucfirst($_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2])." Warning for Bosnia and Herzegovina - region ".$REG_NAME[$reg_index]."</headline>\n");
                                if(strlen($_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][7])==0)$descriptionEN="No Warnings";
                                else $descriptionEN=$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][7];
                                fwrite($file_pointer_CAP,"<description>".$descriptionEN."</description>\n");
                                if(strlen($_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][13])==0)$instructionsEN="No Instructions";
                                else $instructionsEN=$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][13];
                                fwrite($file_pointer_CAP,"<instruction>".$instructionsEN."</instruction>\n");
                                fwrite($file_pointer_CAP,"<web>".$REG_NMS_URL[$reg_index]."</web>\n");
                                fwrite($file_pointer_CAP,"<parameter>\n<valueName>awareness_level</valueName>\n<value>".$number_of_levels[$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]]."; ".$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]."; ".$severity[$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]]."</value>\n</parameter>\n");
                                fwrite($file_pointer_CAP,"<parameter>\n<valueName>awareness_type</valueName>\n<value>".$number_of_types[$parametar[0]]."; ".$name_of_types[$parametar[0]]."</value>\n</parameter>\n");
                                fwrite($file_pointer_CAP,"<area>\n");
                                fwrite($file_pointer_CAP,"<areaDesc>".$REG_NAME[$reg_index]."</areaDesc>\n");
                                fwrite($file_pointer_CAP,"<polygon>".$REG_CAP_POINTS[$reg_index]."</polygon>\n");
                                fwrite($file_pointer_CAP,"</area>\n");
                                fwrite($file_pointer_CAP,"</info>\n");
                                //bosanski-hrvatski-srpski
                                $lokalni_jezici=array('bs');//,'hr','sr');
                                foreach($lokalni_jezici as $jezik){
                                    fwrite($file_pointer_CAP,"<info>\n");
                                    fwrite($file_pointer_CAP,"<language>".$jezik."</language>\n");
                                    fwrite($file_pointer_CAP,"<category>Met</category>\n");
                                    fwrite($file_pointer_CAP,"<event>".ucfirst(strtolower($parametar[1]))." ".ucfirst($color_translation[$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]])." Upozorenje</event>\n");
                                    fwrite($file_pointer_CAP,"<responseType>".$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][8]."</responseType>\n");
                                    fwrite($file_pointer_CAP,"<urgency>Future</urgency>\n");
                                    fwrite($file_pointer_CAP,"<severity>".$severity[$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]]."</severity>\n");
                                    fwrite($file_pointer_CAP,"<certainty>".$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][9]."</certainty>\n");
                                    fwrite($file_pointer_CAP,"<effective>".$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["creation_time"]."</effective>\n");
                                    fwrite($file_pointer_CAP,"<onset>".$start_datetime->format('Y-m-d\TH:i:sP')."</onset>\n");
                                    fwrite($file_pointer_CAP,"<expires>".$end_datetime->format('Y-m-d\TH:i:sP')."</expires>\n");
                                    fwrite($file_pointer_CAP,"<senderName>".$REG_INSTITUTION[$reg_index][0]."</senderName>\n");
                                    fwrite($file_pointer_CAP,"<headline>".ucfirst(strtolower($parametar[1]))." ".ucfirst($color_translation[$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]])." Upozorenje za Bosnu i Hercegovinu - region ".$REG_NAME[$reg_index]."</headline>\n");
                                    if(strlen($_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][5])==0)$descriptionBS="Nema upozorenja";
                                    else $descriptionBS=$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][5];
                                    fwrite($file_pointer_CAP,"<description>".$descriptionBS."</description>\n");
                                    if(strlen($_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][12])==0)$instructionsBS="No Instructions";
                                    else $instructionsBS=$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][12];
                                    fwrite($file_pointer_CAP,"<instruction>".$instructionsBS."</instruction>\n");
                                    fwrite($file_pointer_CAP,"<web>".$REG_NMS_URL[$reg_index]."</web>\n");
                                    fwrite($file_pointer_CAP,"<parameter>\n<valueName>awareness_level</valueName>\n<value>".$number_of_levels[$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]]."; ".$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]."; ".$severity[$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]]."</value>\n</parameter>\n");
                                    fwrite($file_pointer_CAP,"<parameter>\n<valueName>awareness_type</valueName>\n<value>".$number_of_types[$parametar[0]]."; ".$name_of_types[$parametar[0]]."</value>\n</parameter>\n");
                                    fwrite($file_pointer_CAP,"<area>\n");
                                    fwrite($file_pointer_CAP,"<areaDesc>".$REG_NAME[$reg_index]."</areaDesc>\n");
                                    fwrite($file_pointer_CAP,"<polygon>".$REG_CAP_POINTS[$reg_index]."</polygon>\n");
                                    fwrite($file_pointer_CAP,"</area>\n");
                                    fwrite($file_pointer_CAP,"</info>\n");
                                }
                                fwrite($file_pointer_CAP,"</alert>");
                                fclose($file_pointer_CAP);
                                chmod("./outputCAPfiles/BA_".substr($_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["identifier"],17,6)."_".substr($_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["identifier"],23,6)."_".$REG_ID[$reg_index].$number_of_types[$parametar[0]].$i.$rnd.".xml",0777);
                            }
                        }else{
                            if($_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]=="green"){
                                $responseType="AllClear";
                                $onset=$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["creation_time"];
                                $expires=$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["creation_time"];
                                $descriptionBS="Nema upozorenja";
                                $descriptionEN="No Warnings";
                                $instructionsBS="Nema instrukcija";
                                $instructionsEN="No instructions";
                            }else{
                                $start_datetime=new DateTime(substr($warning_date,0,11).$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][3].":00".substr($warning_date,19,-1));
                                $end_datetime=new DateTime(substr($warning_date,0,11).$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][4].":00".substr($warning_date,19,-1));
                                $responseType=$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][8];
                                $onset=$start_datetime->format('Y-m-d\TH:i:sP');
                                $expires=$end_datetime->format('Y-m-d\TH:i:sP');
                                $descriptionBS=$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][5];
                                $descriptionEN=$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][7];
                                $instructionsBS=$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][12];
                                $instructionsEN=$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][13];
                            }
                            $rnd=rand(10,99);
                            $file_pointer_CAP=fopen("./outputCAPfiles/BA_".substr($_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["identifier"],17,6)."_".substr($_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["identifier"],23,6)."_".$REG_ID[$reg_index].$number_of_types[$parametar[0]].$i.$rnd.".xml","w");
                            fwrite($file_pointer_CAP,"<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n");
                            fwrite($file_pointer_CAP,"<alert xmlns=\"urn:oasis:names:tc:emergency:cap:1.2\">\n");
                            fwrite($file_pointer_CAP,"<identifier>".$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["identifier"]."</identifier>\n");
                            fwrite($file_pointer_CAP,"<sender>".$REG_SENDER[$reg_index]."</sender>\n");
                            fwrite($file_pointer_CAP,"<sent>".$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["creation_time"]."</sent>\n");
                            fwrite($file_pointer_CAP,"<status>Update</status>\n");
                            fwrite($file_pointer_CAP,"<msgType>Alert</msgType>\n");
                            fwrite($file_pointer_CAP,"<scope>Public</scope>\n");
                            fwrite($file_pointer_CAP,"<references>".$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["references"]."</references>\n");
                            //engleski
                            fwrite($file_pointer_CAP,"<info>\n");
                            fwrite($file_pointer_CAP,"<language>en</language>\n");
                            fwrite($file_pointer_CAP,"<category>Met</category>\n");
                            fwrite($file_pointer_CAP,"<event>".ucfirst(strtolower($parametar[0]))." ".ucfirst(strtolower($_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]))." Warning</event>\n");
                            fwrite($file_pointer_CAP,"<responseType>".$responseType."</responseType>\n");
                            fwrite($file_pointer_CAP,"<urgency>Future</urgency>\n");
                            fwrite($file_pointer_CAP,"<severity>".$severity[$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]]."</severity>\n");
                            fwrite($file_pointer_CAP,"<certainty>".$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][9]."</certainty>\n");
                            fwrite($file_pointer_CAP,"<effective>".$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["creation_time"]."</effective>\n");
                            fwrite($file_pointer_CAP,"<onset>".$onset."</onset>\n");
                            fwrite($file_pointer_CAP,"<expires>".$expires."</expires>\n");
                            fwrite($file_pointer_CAP,"<senderName>".$REG_INSTITUTION[$reg_index][1]."</senderName>\n");
                            fwrite($file_pointer_CAP,"<headline>".ucfirst(strtolower($parametar[0]))." ".ucfirst($_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2])." Warning for Bosnia and Herzegovina - region ".$REG_NAME[$reg_index]."</headline>\n");
                            fwrite($file_pointer_CAP,"<description>".$descriptionEN."</description>\n");
                            fwrite($file_pointer_CAP,"<instruction>".$instructionsEN."</instruction>\n");
                            fwrite($file_pointer_CAP,"<web>".$REG_NMS_URL[$reg_index]."</web>\n");
                            fwrite($file_pointer_CAP,"<parameter>\n<valueName>awareness_level</valueName>\n<value>".$number_of_levels[$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]]."; ".$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]."; ".$severity[$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]]."</value>\n</parameter>\n");
                            fwrite($file_pointer_CAP,"<parameter>\n<valueName>awareness_type</valueName>\n<value>".$number_of_types[$parametar[0]]."; ".$name_of_types[$parametar[0]]."</value>\n</parameter>\n");
                            fwrite($file_pointer_CAP,"<area>\n");
                            fwrite($file_pointer_CAP,"<areaDesc>".$REG_NAME[$reg_index]."</areaDesc>\n");
                            fwrite($file_pointer_CAP,"<polygon>".$REG_CAP_POINTS[$reg_index]."</polygon>\n");
                            fwrite($file_pointer_CAP,"</area>\n");
                            fwrite($file_pointer_CAP,"</info>\n");
                            //bosanski-hrvatski-srpski
                            $lokalni_jezici=array('bs');//,'hr','sr');
                            foreach($lokalni_jezici as $jezik){
                                fwrite($file_pointer_CAP,"<info>\n");
                                fwrite($file_pointer_CAP,"<language>".$jezik."</language>\n");
                                fwrite($file_pointer_CAP,"<category>Met</category>\n");
                                fwrite($file_pointer_CAP,"<event>".ucfirst(strtolower($parametar[1]))." ".ucfirst($color_translation[$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]])." Upozorenje</event>\n");
                                fwrite($file_pointer_CAP,"<responseType>".$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][8]."</responseType>\n");
                                fwrite($file_pointer_CAP,"<urgency>Future</urgency>\n");
                                fwrite($file_pointer_CAP,"<severity>".$severity[$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]]."</severity>\n");
                                fwrite($file_pointer_CAP,"<certainty>".$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][9]."</certainty>\n");
                                fwrite($file_pointer_CAP,"<effective>".$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["creation_time"]."</effective>\n");
                                fwrite($file_pointer_CAP,"<onset>".$onset."</onset>\n");
                                fwrite($file_pointer_CAP,"<expires>".$expires."</expires>\n");
                                fwrite($file_pointer_CAP,"<senderName>".$REG_INSTITUTION[$reg_index][0]."</senderName>\n");
                                fwrite($file_pointer_CAP,"<headline>".ucfirst(strtolower($parametar[1]))." ".ucfirst($color_translation[$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]])." Upozorenje za Bosnu i Hercegovinu - region ".$REG_NAME[$reg_index]."</headline>\n");
                                fwrite($file_pointer_CAP,"<description>".$descriptionBS."</description>\n");
                                fwrite($file_pointer_CAP,"<instruction>".$instructionsBS."</instruction>\n");
                                fwrite($file_pointer_CAP,"<web>".$REG_NMS_URL[$reg_index]."</web>\n");
                                fwrite($file_pointer_CAP,"<parameter>\n<valueName>awareness_level</valueName>\n<value>".$number_of_levels[$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]]."; ".$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]."; ".$severity[$_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["sadrzaj_upozorenja"][2]]."</value>\n</parameter>\n");
                                fwrite($file_pointer_CAP,"<parameter>\n<valueName>awareness_type</valueName>\n<value>".$number_of_types[$parametar[0]]."; ".$name_of_types[$parametar[0]]."</value>\n</parameter>\n");
                                fwrite($file_pointer_CAP,"<area>\n");
                                fwrite($file_pointer_CAP,"<areaDesc>".$REG_NAME[$reg_index]."</areaDesc>\n");
                                fwrite($file_pointer_CAP,"<polygon>".$REG_CAP_POINTS[$reg_index]."</polygon>\n");
                                fwrite($file_pointer_CAP,"</area>\n");
                                fwrite($file_pointer_CAP,"</info>\n");
                            }
                            fwrite($file_pointer_CAP,"</alert>");
                            fclose($file_pointer_CAP);
                            chmod("./outputCAPfiles/BA_".substr($_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["identifier"],17,6)."_".substr($_POST[$parametar[0]."_".$REG_ID[$reg_index]."_".$i]["identifier"],23,6)."_".$REG_ID[$reg_index].$number_of_types[$parametar[0]].$i.$rnd.".xml",0777);
                        }
                    }
                }
            }
        }
    }
    $file_pointer_APP=fopen("./outputAPPfiles/".substr(array_keys($json_APP)[0],4).".json","w");
    fwrite($file_pointer_APP,json_encode($json_APP, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    fclose($file_pointer_APP);
?>