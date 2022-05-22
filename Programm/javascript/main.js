
Vue.createApp({
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
        { name: [] },
      ],

      textareas: [
        { name: [] },
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
        "#800080",
        "#FF00FF",
        "#000080",
        "#0000FF",
        "#008080",
        "#00FFFF",
        "#008000",
        "#00FF00",
        "#808000",
        "#FFFF00",
        "#800000",
        "#FF0000"
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
      for (let i = 1; i <= this.tables; i++) {
        console.log(this.tables)
        if (maxvalue < this.InputValueThead[i] && this.InputValueThead[i] < 1000) {
          maxvalue = this.InputValueThead[i];
        }
      }
      for (let a = 0; a <= maxvalue; a++) {
        this.firstthead[a] = false;
        this.theadzaehler[a] = 0;
      }

      for (let i = 1; i <= this.tables; i++) {
        for (let a = 0; a <= this.tablelength; a++) {
          if (this.ChangedTheadValue[i].name[a] !== true) {
          this.TheadValue[i].name[a] = "";
          }
          if (this.firstthead[this.InputValueThead[i]] === false) {
            
            if (this.textareas[i].name[a] === true) {
              this.TheadValue[i].name[a] = "0" + "F" + this.InputValueThead[i];
              this.firstthead[this.InputValueThead[i]] = true;
            }
          }

          if (this.ChangedTheadValue[i].name[a] !== true) {

            if (this.textareas[i].name[a] === true) {
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

      for (let a = 0; a <= this.tablelength; a++) {
        this.textareas[this.tables].name[a] = false;
      }
      for (let i = 0; i <= this.tablelength; i += tablewide) {
        this.textareas[this.tables].name[i] = true;
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

      this.textareas[table].name[length] = this.textareas[table].name[length] === false;
      for (let i = 0; i <= this.tablelength; i++) {
        if (this.textareas[table].name[i] === true) {
          this.items[table].name.push(i);
          this.FontSize[table].name[i] = zaehler * multiplikator;
          zaehler = 1;
        } else {
          zaehler++;
        }
      }
    },


    //create a new table
    addtable: function () {
      let array = [
        this.FontSize,
        this.items,
        this.textareas,
        this.TheadValue,
        this.ChangedTheadValue
      ];


      this.tables++;

      array.forEach((arrays) => {
        arrays.push({ name: [] });
      });

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


}).mount('#app')

