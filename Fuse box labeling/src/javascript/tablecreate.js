let vOne = Vue.createApp({

  data() {
    return {
      Page: true,
      
      //print
      Visibility: false,

      //thead
      BackGroundColor: [],
      InputValueThead: [],
      TheadZaehler: [],
      FirstThead: [],

      TheadValue: [
        { Index: [] },
      ],

      ChangedTheadValue: [
        { Index: [] },
      ],

      //table
      TablesLength: 24,
      Tables: 0,
      TbodyValue: [
        { Index: [] },
      ],
      Tbodylength:[
        { Index: [] },
      ],

      FontSize: [
        { Index: [] },
      ],

      TextAreas: [
        { Index: [] },

      ],

      Items: [
        { Index: [] },
      ],

      Item: [],

    };
  },

  //pre load Funktions
  created() {
    this.InputValueThead[1] = "1";
    this.addtable();
  },


  methods: {

    //load thead background
    backgroundcolor: function () {
      let colors = [
        "#38e867",
        "#ed3124",
        "#ed8524",
        "#edc124",
        "#d9ed24",
        "#8ced24",
        "#2aed24",
        "#24ed78",
        "#24edc5",
        "#24b1ed",
        "#be24ed",
        "#ed2485"
      ];
      for (let i = 1; i < this.Tables + 1; i++) {
        this.BackGroundColor[i] = colors[this.InputValueThead[i] - 1];
      }
    },

    //Set thead Value to default
    deletemyinputtheadvalue: function (table, col) {
      this.ChangedTheadValue[table].Index[col] = false;
      this.loadtheadvalue();
    },

    //Change thead value
    loadmyinputtheadvalue: function (table, col) {
      this.ChangedTheadValue[table].Index[col] = true;
      this.loadtheadvalue();
    },

    //load theader with value and color
    loadthead: function () {
      this.backgroundcolor();
      this.loadtheadvalue();
    },

    //Load theader with values ​​by default
    loadtheadvalue: function () {
      let maxvalue = 0;
      for (let i = 1; i < this.Tables + 1; i++) {
        if (maxvalue < this.InputValueThead[i] && this.InputValueThead[i] < 1000) {
          maxvalue = this.InputValueThead[i];
        }
      }
      for (let a = 0; a < maxvalue + 1; a++) {
        this.FirstThead[a] = false;
        this.TheadZaehler[a] = 0;
      }

      for (let i = 1; i < this.Tables + 1; i++) {
        for (let a = 0; a < this.TablesLength + 1; a++) {
          if (this.ChangedTheadValue[i].Index[a] !== true) {
            this.TheadValue[i].Index[a] = "";
          }
          if (this.FirstThead[this.InputValueThead[i]] === false) {

            if (this.TextAreas[i].Index[a] === true) {
              if (this.ChangedTheadValue[i].Index[a] !== true) {
              this.TheadValue[i].Index[a] = "0" + "F" + this.InputValueThead[i];
              }
              this.FirstThead[this.InputValueThead[i]] = true;
            }
          }
        
          if (this.ChangedTheadValue[i].Index[a] !== true) {
            if (this.TextAreas[i].Index[a] === true) {
              if (this.TheadValue[i].Index[a] !== "0F" + this.InputValueThead[i]) {
                this.TheadZaehler[this.InputValueThead[i]]++;
                this.TheadValue[i].Index[a] = this.InputValueThead[i] + "F" + this.TheadZaehler[this.InputValueThead[i]];
              }
            }
          }
        }
      }
    },

    //load how many lines are created at the beginning
    loadtableline: function () {
      let TableWide = 2;

      for (let a = 0; a < this.TablesLength + 1; a++) {
        this.TextAreas[this.Tables].Index[a] = false;
      }
      for (let i = 0; i < this.TablesLength + 1; i += TableWide) {
        this.TextAreas[this.Tables].Index[i] = true;
      }
    },


    //can create line in table and add a textarea
    changetable: function (Table, Length) {
      this.TextAreas[Table].Index[Length] = this.TextAreas[Table].Index[Length] === false;
      this.TbodyValue[Table].Index[Length] = "";
      this.loadtable();
      this.loadtheadvalue();
    },


    loadtable: function(){
      let zaehler = 0;
      let multiplikator = 100 / (this.TablesLength);

      for (let a = 1; a < this.Tables+1; a++) {
        zaehler = 0;
        this.Items[a].Index.splice(0);
        this.Item.splice(0);
        for (let i = 0; i < this.TablesLength + 1; i++) {
          if (this.TextAreas[a].Index[i] === true) {
            this.Items[a].Index.push(i);
            this.FontSize[a].Index[i] = zaehler * multiplikator;
            this.Tbodylength[a].Index[i] = zaehler;
            zaehler = 1;
          } else {
            zaehler++;
          }
        }
      }
    },

    //create a new table
    addtable: function () {
      let array = [
        this.FontSize,
        this.Items,
        this.TextAreas,
        this.TheadValue,
        this.ChangedTheadValue,
        this.TbodyValue,
        this.Tbodylength
      ];

      this.Tables++;

      array.forEach((arrays) => {
        arrays.push({ Index: [] });
      });


      this.loadtableline();
      this.changetable(this.Tables, 0, true);
      if (this.Tables > 1) {
        this.InputValueThead[this.Tables] = this.InputValueThead[this.Tables - 1];
      }
      this.backgroundcolor();
      this.loadtheadvalue();
    },
    

    //delete the last table
    removetable: function () {
      let array = [
        this.FontSize,
        this.Items,
        this.TextAreas,
        this.TheadValue,
        this.ChangedTheadValue,
        this.TbodyValue,
        this.Tbodylength
      ];

      if (this.Tables > 1) {

        array.forEach((arrays) => {
          arrays.splice(this.Tables, 1);
        });

        this.Tables--;
      }
    },

    //print Tables
    printInfo: function () {
      this.Visibility = true;
      setTimeout(() => window.print(), 1);
      setTimeout(() => this.Visibility = false, 1);
    },
  },

}).mount('#vOne')


