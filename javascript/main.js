

Vue.createApp({
  data() {
    return {
      theadzaehler: 0,
      tableclicked: true,
      tablelength:24,
      tables: 0,
      FontSize: [
        {name:[]},
      ],
      textareas: [
        {name:[]},
      ],
      items: [
        {name: []},
      ],
      item: [],

      InputValueThead: [],

      TheadValue: [
        {name:[]},
      ],
      theadevalue3: [
        {name:[]},
      ],
      value:[],
    };
  },

    //pre load Funktions
    created() {
      this.addtable();
    },


  methods: {

    loadtheadvalue: function(table){
      this.TheadValue.push({name:[]});
      let firstthead;

      if(this.InputValueThead[table] !== this.InputValueThead[table-1]){
        this.zaehler = 0;
        firstthead = false;
      }
      for (let i = 0; i < this.tablelength+1; i++) {
        if (this.textareas[table].name[i] === true) {
          if (firstthead === false){
            firstthead = true;
            this.TheadValue[table].name[i] = "0" + "F" + this.InputValueThead[table];
          }else{
            this.zaehler++;
            this.TheadValue[table].name[i] = this.InputValueThead[table] + "F" + this.zaehler;
          }
        }
      }
    },

    loadtablelength: function () {
      for (let a = 0; a < this.tablelength+1; a++) {
        this.textareas[this.tables].name[a] = false;
    }
        for (let i = 0; i < this.tablelength+1; i+=2) {
          this.textareas[this.tables].name[i] = true;
      }
    },

    changetableclick: function(index, index2){
      if(this.tableclicked === false){
        this.changetable(index, index2, true)
        this.tableclicked = false;
      }else{
        this.tableclicked = false;
      }
    },

    //can create line in table and add a textarea
    changetable: function (index, index2, hover) {
      
      let zaehler = 0;
      let multiplikator = 100 / (this.tablelength);

      if(hover === true){
        this.tableclicked = hover;
      }
      if(this.tableclicked === true){
      this.items[index].name.splice(0);
      this.item.splice(0);
    
      this.textareas[index].name[index2] = this.textareas[index].name[index2] === false;
      for (let i = 0; i < this.tablelength+1; i++) {
        if (this.textareas[index].name[i] === true) {
          this.items[index].name.push(i);
          this.FontSize[index].name[i] = zaehler * multiplikator;
          zaehler = 1;
        } else {
          zaehler++;
        }
      }
      }
    },

    addtable: function () {
      this.tables++;

      this.FontSize.push({name:[]})
      this.items.push({name:[]})
      this.textareas.push({name:[]})

      this.loadtablelength();
      this.changetable(this.tables, 0, true);

      this.loadtheadvalue(this.tables);
    },

    removetable: function () {
      if (this.tables > 1){
        this.FontSize.splice(this.tables, 1)
        this.items.splice(this.tables, 1)
        this.textareas.splice(this.tables, 1)
        this.tables--;
      }
    },

      printInfo: function () {
        window.print();
    },
  },


  mytestfunction: function(){

  },

}).mount('#app')

