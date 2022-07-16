let fileHandle;

function exportData() {

    let Jsons = new Array();

    let Variables = [
        vOne.Tables,
        vOne.FontSize,
        vOne.TextAreas,
        vOne.TheadValue,
        vOne.ChangedTheadValue,
        vOne.TbodyValue,
        vOne.TheadZaehler,
        vOne.InputValueThead
    ];

    Variables.forEach((arrays) => {
        Jsons.push(arrays)
    });
    let dataStr = JSON.stringify(Jsons);
    var myBlob = new Blob([dataStr], { type: "text/plain" });
    return myBlob;
}



let vThree = Vue.createApp({

    data() {
        return {
            Page: false,

            InputFileName: "",
            fileHandle: "",
        };
    },


    methods: {

        async exportjsonfilestream() {

            let stream = await fileHandle.createWritable();
            await stream.write(exportData());
            await stream.close();
        },


        async exportjsonfile() {
            const fileHandle1 = await window.showSaveFilePicker({
                suggestedName: this.InputFileName,
                types: [{
                    description: "JSON",
                    accept: { "text/plain": [".json"] }
                }],
                excludeAcceptAllOption: true,
            });
            const fileStream = await fileHandle1.createWritable();
            fileHandle = fileHandle1;
            document.getElementById("InputFileName").value = fileHandle.name;
            await fileStream.write(exportData());
            await fileStream.close();
        },


        async importjsonfile() {
            const pickerOpts = {
                types: [{
                    description: "JSON",
                    accept: { "text/plain": [".json"] }
                }],
                excludeAcceptAllOption: true,
                multiple: false
            };

            [fileHandle] = await window.showOpenFilePicker(pickerOpts);
            let fileData = await fileHandle.getFile();
            console.log(fileData.name);
            document.getElementById("InputFileName").value = fileHandle.name;
            var fr = new FileReader();

            fr.onload = function (e) {
                var result = JSON.parse(e.target.result);
                var formatted = JSON.stringify(result);
                let JsonImport = JSON.parse(formatted);
                //for (i = vOne.Tables; i < JsonImport[0]; i++) {
                //    vOne.addtable();
                //}

                //let testarray = JsonImport[1].index;
                //vOne.FontSize.push(testarray);
                console.log(vOne.FontSize);
                let test = vOne.FontSize;
                console.log(test);
                vOne.FontSize = vOne.FontSize.concat(JsonImport[1])
                console.log(vOne.FontSize);
                //vOne.TextAreas = JsonImport[2];

                //vOne.TheadValue = JsonImport[3];

                //vOne.ChangedTheadValue = JsonImport[4];

                //vOne.TbodyValue = JsonImport[5];

                //vOne.TheadZaehler = JsonImport[6];

                //vOne.InputValueThead = JsonImport[7];

                //vOne.TestValue = JsonImport[8];

                vOne.loadtable();
                vOne.loadthead();

            }
            fr.readAsText(fileData);
        },
    },

}).mount('#vThree')