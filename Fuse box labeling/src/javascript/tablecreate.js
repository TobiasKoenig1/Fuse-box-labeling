let vOne = Vue.createApp({

  data() {
    return {
      //print
      visibility: false,

      //thead
      BackGroundColor: [],
      InputValueThead: [],
      theadzaehler: [],
      firstthead: [],

      TheadValue: [
        { name: [] },
      ],

      ChangedTheadValue: [
        { name: [] },
      ],

      //table
      tableclicked: true,
      tablelength: 24,
      tables: 0,

      FontSize: [
        { FontSize: [] },
      ],

      textareas: [
        { textareas: [] },
      ],

      items: [
        { name: [] },
      ],

      item: [],

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
      for (let i = 1; i < this.tables + 1; i++) {
        this.BackGroundColor[i] = colors[this.InputValueThead[i]-1];
      }
    },

    //Set thead Value to default
    deletemyinputtheadvalue: function(table, col){
      this.ChangedTheadValue[table].name[col] = false;
      this.loadtheadvalue();
    },

    //Change thead value
    loadmyinputtheadvalue: function (table, col) {
      this.ChangedTheadValue[table].name[col] = true;
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
      for (let i = 1; i < this.tables +1; i++) {
        if (maxvalue < this.InputValueThead[i] && this.InputValueThead[i] < 1000) {
          maxvalue = this.InputValueThead[i];
        }
      }
      for (let a = 0; a < maxvalue+1; a++) {
        this.firstthead[a] = false;
        this.theadzaehler[a] = 0;
      }

      for (let i = 1; i < this.tables +1; i++) {
        for (let a = 0; a < this.tablelength +1; a++) {
          if (this.ChangedTheadValue[i].name[a] !== true) {
          this.TheadValue[i].name[a] = "";
          }
          if (this.firstthead[this.InputValueThead[i]] === false) {
            
            if (this.textareas[i].textareas[a] === true) {
              this.TheadValue[i].name[a] = "0" + "F" + this.InputValueThead[i];
              this.firstthead[this.InputValueThead[i]] = true;
            }
          }

          if (this.ChangedTheadValue[i].name[a] !== true) {

            if (this.textareas[i].textareas[a] === true) {
              if (this.TheadValue[i].name[a] !== "0F" + this.InputValueThead[i]) {
                this.theadzaehler[this.InputValueThead[i]]++;
                this.TheadValue[i].name[a] = this.InputValueThead[i] + "F" + this.theadzaehler[this.InputValueThead[i]];
              }
            }
          }
        }
      }
    },

    //load how many lines are created at the beginning
    loadtableline: function () {
      let tablewide = 2;

      for (let a = 0; a < this.tablelength +1; a++) {
        this.textareas[this.tables].textareas[a] = false;
      }
      for (let i = 0; i < this.tablelength +1; i += tablewide) {
        this.textareas[this.tables].textareas[i] = true;
      }
    },


    //check table click for hover effect
    changetableclick: function (table, length) {
      if (this.tableclicked === false) {
        this.previewtable(table, length, true)
        this.tableclicked = false;
      } else {
        this.tableclicked = false;
      }
    },

    //preview lines that are changed
    previewtable: function (table, length, hover) {
      if (hover === true) {
        this.tableclicked = true;
      }
      if (this.tableclicked === true) {
        this.changetable(table, length)
      }
      this.loadtheadvalue();
    },


    //can create line in table and add a textarea
    changetable: function (table, length) {

      let zaehler = 0;
      let multiplikator = 100 / (this.tablelength);

      this.items[table].name.splice(0);
      this.item.splice(0);

      this.textareas[table].textareas[length] = this.textareas[table].textareas[length] === false;
      for (let i = 0; i < this.tablelength +1; i++) {
        if (this.textareas[table].textareas[i] === true) {
          this.items[table].name.push(i);
          this.FontSize[table].FontSize[i] = zaehler * multiplikator;
          zaehler = 1;
        } else {
          zaehler++;
        }
      }
    },


    //create a new table
    addtable: function () {

        this.FontSize.push({ FontSize: [] });
        this.items.push({ name: [] });
        this.textareas.push({ textareas: [] });
        this.TheadValue.push({ name: [] });
        this.ChangedTheadValue.push({ name: [] });


      this.tables++;

      this.loadtableline();
      this.changetable(this.tables, 0, true);
      if (this.tables > 1) {
        this.InputValueThead[this.tables] = this.InputValueThead[this.tables - 1];
      }
      this.backgroundcolor();
      this.loadtheadvalue();
    },

    //delete the last table
    removetable: function () {
      let array = [
        this.FontSize,
        this.items,
        this.textareas,
        this.TheadValue,
        this.ChangedTheadValue
      ];

      if (this.tables > 1) {

        array.forEach((arrays) => {
          arrays.splice(this.tables, 1);
        });

        this.tables--;
      }
    },

    //print tables
    printInfo: function () {
      this.visibility = true;
      setTimeout(() => window.print(), 1);
      setTimeout(() => this.visibility = false, 1);
    },
  },

}).mount('#vOne')


