let vOne = Vue.createApp({

  data() {
    return {
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
      TableClicked: true,
      TablesLength: 24,
      Tables: 0,
      TbodyValue:[
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
    this.InputValueThead[1] = 1;
    this.addtable();
  },


  methods: {

    //load thead background
    backgroundcolor: function(){
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
        this.BackGroundColor[i] = colors[this.InputValueThead[i]-1];
      }
    },

    //Set thead Value to default
    deletemyinputtheadvalue: function(table, col){
      this.ChangedTheadValue[table].Index[col] = false;
      this.loadtheadvalue();
    },

    //Change thead value
    loadmyinputtheadvalue: function (table, col) {
      this.ChangedTheadValue[table].Index[col] = true;
      this.loadtheadvalue();
    },

    //load theader with value and color
    loadthead: function(){
      this.backgroundcolor();
      this.loadtheadvalue();
    },

    //Load theader with values ​​by default
    loadtheadvalue: function () {
      let maxvalue = 0;
      for (let i = 1; i < this.Tables +1; i++) {
        if (maxvalue < this.InputValueThead[i] && this.InputValueThead[i] < 1000) {
          maxvalue = this.InputValueThead[i];
        }
      }
      for (let a = 0; a < maxvalue+1; a++) {
        this.FirstThead[a] = false;
        this.TheadZaehler[a] = 0;
      }

      for (let i = 1; i < this.Tables +1; i++) {
        for (let a = 0; a < this.TablesLength +1; a++) {
          if (this.ChangedTheadValue[i].Index[a] !== true) {
          this.TheadValue[i].Index[a] = "";
          }
          if (this.FirstThead[this.InputValueThead[i]] === false) {
            
            if (this.TextAreas[i].Index[a] === true) {
              this.TheadValue[i].Index[a] = "0" + "F" + this.InputValueThead[i];
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
      let tablewide = 2;

      for (let a = 0; a < this.TablesLength +1; a++) {
        this.TextAreas[this.Tables].Index[a] = false;
      }
      for (let i = 0; i < this.TablesLength +1; i += tablewide) {
        this.TextAreas[this.Tables].Index[i] = true;
      }
    },


    //check table click for hover effect
    changetableclick: function (table, length) {
      if (this.TableClicked === false) {
        this.previewtable(table, length, true)
        this.TableClicked = false;
      } else {
        this.cleartbodyvalue(table, length);
        this.TableClicked = false;
      }
    },

    //preview lines that are changed
    previewtable: function (table, length, hover) {
      if (hover === true) {
        this.TableClicked = true;
      }
      if (this.TableClicked === true) {
        this.changetable(table, length)
      }
      this.loadtheadvalue();
    },


    //can create line in table and add a textarea
    changetable: function (table, length) {

      let zaehler = 0;
      let multiplikator = 100 / (this.TablesLength);

      this.Items[table].Index.splice(0);
      this.Item.splice(0);

      this.TextAreas[table].Index[length] = this.TextAreas[table].Index[length] === false;
      for (let i = 0; i < this.TablesLength +1; i++) {
        if (this.TextAreas[table].Index[i] === true) {
          this.Items[table].Index.push(i);
          this.FontSize[table].Index[i] = zaehler * multiplikator;
          zaehler = 1;
        } else {
          zaehler++;
        }
      }
    },


    cleartbodyvalue: function(Table, Length){
        this.TbodyValue[Table].Index[Length] = "";
    },



    //create a new table
    addtable: function () {
      let array = [
        this.FontSize,
        this.Items,
        this.TextAreas,
        this.TheadValue,
        this.ChangedTheadValue,
        this.TbodyValue
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
     // this.cleartbodyvalue(this.Tables);
    },

    //delete the last table
    removetable: function () {
      let array = [
        this.FontSize,
        this.Items,
        this.TextAreas,
        this.TheadValue,
        this.ChangedTheadValue,
        this.TbodyValue
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


