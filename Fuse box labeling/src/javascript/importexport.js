let fileHandle;
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
function exportData() {


    Variables[0] = vOne.Tables;
    let dataStr = JSON.stringify(Variables);
    var myBlob = new Blob([dataStr], { "text/plain": [".json"] });
    return myBlob;
}



let vThree = Vue.createApp({

    data() {
        return {
            Page: false,
            InputFileName: "",
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
            document.getElementById("InputFileName").value = fileHandle.name;
            var fr = new FileReader();

            fr.onload = function (e) {
                var result = JSON.parse(e.target.result);
                var formatted = JSON.stringify(result);
                let JsonImport = JSON.parse(formatted);

                console.log(JsonImport[0]);
                vOne.Tables = JsonImport[0] + vOne.Tables;

                for (let i = 1; i < JsonImport.length; i++) {
                    JsonImport[i].shift();
                }

                JsonImport[1].forEach((arrays) => {
                    vOne.FontSize.push(arrays);
                    vOne.Items.push({ Index: [] });
                    vOne.Tbodylength.push({ Index: [] });
                });

                JsonImport[2].forEach((arrays) => {
                    vOne.TextAreas.push(arrays);
                });

                JsonImport[3].forEach((arrays) => {
                    vOne.TheadValue.push(arrays);
                });

                JsonImport[4].forEach((arrays) => {
                    vOne.ChangedTheadValue.push(arrays);
                });

                JsonImport[5].forEach((arrays) => {
                    vOne.TbodyValue.push(arrays);
                });

                JsonImport[6].forEach((arrays) => {
                    vOne.TheadZaehler.push(arrays);
                });

                JsonImport[7].forEach((arrays) => {
                    vOne.InputValueThead.push(arrays);
                });

                vOne.loadtable();
                vOne.loadthead();

            }
            fr.readAsText(fileData);
        },
    },

}).mount('#vThree')