let vTwo = Vue.createApp({
  data() {
    return {
      Page: true,

      TableRow: 0,
      RowNumber: [],
      Thead: [
        { Value: [] },
        { Changed: [] },
      ],
      Tbody: [
        { Value: [] },
        { Changed: [] },
      ],
      Fuse: [
        { Value: [] },
        { Changed: [] },
      ],
      SupplyLine: [
        { Value: [] },
        { Changed: [] },
      ],
    }
  },

 //pre load Funktions
  created() {
    //this.setchangedtableview();
  },



  methods: {


    setchangedtableview: function(){
      let Zaehler = 0;
      let array = [
        this.Thead,
        this.Tbody,
        this.Fuse,
        this.SupplyLine,
      ];

      for (let i = 1; i < vOne.Tables + 1; i++) {
        for (let a = 1; a < vOne.TablesLength + 1; a++) {
          if (vOne.TextAreas[i].Index[a] === true) {
            Zaehler++;

            for(let b = 0; b< array.length; b++){
              if(array[b][1].Changed[Zaehler] !== true){
                array[b][1].Changed[Zaehler] = false;
              }
            }
          }
        }
      }
    },

    //ceate a full view of all table
    createtableview: function () {
      this.TableRow = 0;
      let StartZaehler = 1;
      let EndZaehler = 0;
      for (let i = 1; i < vOne.Tables + 1; i++) {
        for (let a = 1; a < vOne.TablesLength + 1; a++) {
          if (vOne.TextAreas[i].Index[a] === true) {
            this.TableRow++;

            EndZaehler += vOne.Tbodylength[i].Index[a] / 2;

            if (vOne.Tbodylength[i].Index[a] <= 2) {
              this.RowNumber[this.TableRow] = StartZaehler;
            } else {
              this.RowNumber[this.TableRow] = StartZaehler + " - " + EndZaehler;
            }
            StartZaehler += vOne.Tbodylength[i].Index[a] / 2

            if(this.Thead[1].Changed[this.TableRow] !== true){
              this.Thead[0].Value[this.TableRow] = vOne.TheadValue[i].Index[a];
            }

            if(this.Tbody[1].Changed[this.TableRow]  !== true)
            this.Tbody[0].Value[this.TableRow] = vOne.TbodyValue[i].Index[a];

            if(this.Fuse[1].Changed[this.TableRow]  !== true){
              this.Fuse[0].Value[this.TableRow] = "B16A";
            }

            if(this.SupplyLine[1].Changed[this.TableRow]  !== true){
              this.SupplyLine[0].Value[this.TableRow] = "3x15";
            }
          }
        }
      }
    },

    changedtableview: function (Row, Index) {
      let array = [
        this.Thead,
        this.Tbody,
        this.Fuse,
        this.SupplyLine,
      ];

      array[Row][1].Changed[Index] = true;
      
    },

    deletetableview: function (Row, Index){
      let array = [
        this.Thead,
        this.Tbody,
        this.Fuse,
        this.SupplyLine,
      ];
      array[Row][1].Changed[Index] = false;
      this.createtableview();
    },
  },
}).mount('#vTwo')