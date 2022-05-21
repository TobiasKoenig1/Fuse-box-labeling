
Vue.createApp({
  data() {
    return {
      //thead
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

      InputValueThead: [],
      LastInputValueThead: [],

      value: [],
    };
  },

  //pre load Funktions
  created() {
    this.InputValueThead[1] = 2;
    this.LastInputValueThead[1] = 0;
    this.addtable();
  },

  methods: {

    loadmyinputtheadvalue: function (table, col) {

      if (this.TheadValue[table].name[col] === "") {
        this.ChangedTheadValue[table].name[col] = false;
      } else {
        this.ChangedTheadValue[table].name[col] = true;
      }
      this.loadtheadvalue();
    },

    //Loads the table header with values ​​by default
    loadtheadvalue: function () {

      for (let i = 1; i < this.tables + 1; i++) {
        let maxvalue = 0;
        if (maxvalue < this.InputValueThead[i]) {
          maxvalue = this.InputValueThead[i];
        }
        for (let a = 0; a < maxvalue + 1; a++) {
          this.firstthead[a] = false;
          this.theadzaehler[a] = 0;
        }
      }

      for (let i = 1; i < this.tables + 1; i++) {
        for (let a = 0; a < this.tablelength + 1; a++) {
          if (this.firstthead[this.InputValueThead[i]] === false) {
            this.TheadValue[i].name[a] = "";
            
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

    //loads how many lines are created at the beginning
    loadtableline: function () {
      let tablewide = 2;

      for (let a = 0; a < this.tablelength + 1; a++) {
        this.textareas[this.tables].name[a] = false;
      }
      for (let i = 0; i < this.tablelength + 1; i += tablewide) {
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
      this.loadtheadvalue(table);
    },

    //preview lines that are changed
    previewtable: function (table, length, hover) {
      if (hover === true) {
        this.tableclicked = true;
      }
      if (this.tableclicked === true) {
        this.changetable(table, length)
      }
    },


    //can create line in table and add a textarea
    changetable: function (table, length) {

      let zaehler = 0;
      let multiplikator = 100 / (this.tablelength);

      this.items[table].name.splice(0);
      this.item.splice(0);

      this.textareas[table].name[length] = this.textareas[table].name[length] === false;
      for (let i = 0; i < this.tablelength + 1; i++) {
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

      this.loadtheadvalue(this.tables);
    },

    //deletes the last table
    removetable: function () {
      let array = [
        this.FontSize,
        this.items,
        this.textareas,
        this.TheadValue,
        THIS.ChangedTheadValue
      ];

      if (this.tables > 1) {

        array.forEach((arrays) => {
          arrays.splice(this.tables, 1);
        });

        this.tables--;
      }
    },


    printInfo: function () {
      window.print();
    },
  },


  mytestfunction: function () {

  },

}).mount('#app')

