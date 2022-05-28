


let vThree = Vue.createApp({

    data() {
        return {

        };
    },

    //pre load Funktions
    created() {

    },


    methods: {
        exportjsonfile() {
            let jsons = new Array();
            jsons.push(vOne.tables)
            jsons.push(vOne.textareas)
            jsons.push(vOne.FontSize)
      
            let dataStr = JSON.stringify(jsons);
      
            console.log(dataStr);
      
            let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            
            let exportFileDefaultName = 'data.json';
        
            let linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        },

        importjsonfile: function () {
            var files = document.getElementById('selectFiles').files;
            if (files.length <= 0) {
                return false;
            }

            var fr = new FileReader();

            fr.onload = function (e) {
                var result = JSON.parse(e.target.result);
                var formatted = JSON.stringify(result, null, 2);
                document.getElementById('result').value = formatted;
                let jsonimport = JSON.parse(formatted);
                vOne.tables = jsonimport[0];
                vOne.textareas = jsonimport[1];
                vOne.FontSize = jsonimport[2];

                console.log(jsonimport);
            }

            fr.readAsText(files.item(0));

        },

        log() {
            console.log(vOne.FontSize)
        },


    },

}).mount('#vThree')


