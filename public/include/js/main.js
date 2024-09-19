document.addEventListener("DOMContentLoaded", function() {
    //@ts-ignore
    download_all();
    //@ts-ignore
    open_modal();

    let scrollTopBtn = document.getElementById("scrollTopBtn");

    
    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    }

    scrollTopBtn.addEventListener("click", function() {
        document.body.scrollTop = 0; 
        document.documentElement.scrollTop = 0;
    });

});

function download_all() {

    let download_all = document.querySelectorAll(".select");

    let file_name;
    let download_link;
    let active_dropdown;
    let value;
    
    function onChange() {
        value = active_dropdown.value;
        console.log(value);
    
        if (value === "svg") {
            download_link.href = "../public/zip/"+ file_name +"_svg.zip"
            console.log(download_link.href)
        }
        else {
            download_link.href = "../public/zip/"+ file_name +"_png.zip"
            // VORSICHT: Die png Zips existieren noch Nicht!!
        }
    }
    download_all.forEach(element => {

        // Hier werden die Variablen refreshed wenn mit dem jeweiligen feld interagiert wird. 
        element.addEventListener("click", function(){
            download_link = element.querySelector(".download_all__link");
            file_name = download_link.getAttribute("data-file");
            active_dropdown = element.querySelector(".download_all__selection");
            active_dropdown.onchange = onChange;
        })
    
    
    });
}

function open_modal() {
    let dialog = document.getElementById("dialog");

    let index;
    let color;
    let title;
    let r_color;
    let icon_number = 1;
     
    let open_modal = document.querySelectorAll(".iconrow__btn");
    let close_btn = document.getElementById("close");
    let download_btn = document.getElementById("download_btn");
    
     
    let icon = document.getElementById("modal_img");
    let modal_title = document.getElementById("modal_title");
     
    let color_choice = document.getElementById("color_choice");
    let file_choice = document.getElementById("file_choice");
    let color_inputs = color_choice.querySelectorAll("input");
    let file_inputs = file_choice.querySelectorAll("input");
     
    let png = document.getElementById("png");
    let svg = document.getElementById("svg");
     
    let choosen_pictures = [];
     
    color_inputs.forEach(element => {
        element.addEventListener("click", function () {
            if (element.checked) {
                color = element.name;
                choosen_pictures.push(title + "/icon-" + icon_number + "-" + color);
            } else {
                r_color = choosen_pictures.indexOf(element.name);
                choosen_pictures.splice(r_color, 1);
            }
     
            console.log(choosen_pictures);
        });
    });
     
    open_modal.forEach(element => {
        element.addEventListener("click", () => {
     
            index = 0;
            icon_number = element.getAttribute("data-iconindex");
            title = element.getAttribute("data-title");

            icon.src = "/public/icon-sammlung/svg/" + title + "/icon-" + icon_number + "-anthracite.svg";
            modal_title.innerHTML = title;
     
            document.getElementById("dialog").showModal();
        });
    });
     

    close_btn.addEventListener("click", function () {
        dialog.close();
    });
     

    download_btn.addEventListener("click", function (element) {
        element.preventDefault();
        // Sorgt dafür das nicht die Standart funktion des Button gemachtwird, in diesem fall die "Download" funktion.  
     
        //Neues Array für die links
        let download_pictures = [];
     
        //checkt ob ein dateiformat ausgewählt ist
        if (!svg.checked && !png.checked) {
            console.log("error: Please select at least one file format"); //das hier wird als text noch ausgegeben werden.
            return;
        }
     
        // Hier werden die Pfade erstellt
        choosen_pictures.forEach(element => {
            if (svg.checked) {
                download_pictures.push("/public/icon-sammlung/svg/" + element + ".svg");
            }
     
            if (png.checked) {
                download_pictures.push("/public/icon-sammlung/png/" + element + ".png");
            }
        });
     
        download_pictures.forEach((element, idx) => {

            let pseudoLink = document.createElement("a"); //ein pseudo link wird erstellt

            pseudoLink.href = element;
            pseudoLink.download = element.split("/").pop(); //setzt den downloadnamen (alles for dem / wird gelöscht[split])

            document.body.appendChild(pseudoLink); //fügt den pseudo
            pseudoLink.click(); //pseudo link simuliert einen 'click'

            document.body.removeChild(pseudoLink); //entfernt den temporären link direkt wieder nach benutzung.

        });
    });
    
    window.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
    
    function checkboxChange() {

        let color = this.id;
        let bobbleItem = document.querySelector(`.color_bobble__item--${color}`);
        
        
        if (this.checked) {
            bobbleItem.style.display = 'block';
        } else {
            bobbleItem.style.display = 'none';
        }
    }
    
    color_inputs.forEach(element => {
        element.addEventListener('change', checkboxChange);
    });

}

