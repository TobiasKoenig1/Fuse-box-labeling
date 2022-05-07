

Vue.createApp({
  data() {
    return {
      tableclicked: true,
      //tablelength:11 sind auf der seite 12 spalten bei änderung muss die css class table-number bearbeited werden
      tablelength:24,
      tables: 0,
      fontsize: [
        {name:[]},
      ],
      textareas: [
        {name:[]},
      ],
      items: [
        {name: []},
      ],
      item: [],

      theadevalue: [
        {name:[]},
      ],
      theadevalue2: [
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
      this.loadtheadvalue();
    },


  methods: {

    loadtheadvalue: function(){
      for(i=0; i< this.tablelength; i++){
        this.theadevalue2[0].name[i] = "F";
        this.theadevalue3[0].name[i] = i;

      }
    },

    loadtablelength: function () {
      for (a = 0; a < this.tablelength+1; a++) {
        this.textareas[this.tables].name[a] = false;
    };
        for (i = 0; i < this.tablelength+1; i+=2) {
          this.textareas[this.tables].name[i] = true;
      };
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
      if(hover === true){
        this.tableclicked = hover;
      };
      if(this.tableclicked === true){
      this.items[index].name.splice(0);
      this.item.splice(0);
      let zähler = 0;
      let multiplikator = 100 / (this.tablelength);
      if (this.textareas[index].name[index2] === false) {
        this.textareas[index].name[index2] = true;
      } else {
        this.textareas[index].name[index2] = false;
      }
      for (i = 0; i < this.tablelength+1; i++) {
        if (this.textareas[index].name[i] === true) {
          this.items[index].name.push(i);
          this.fontsize[index].name[i] = zähler * multiplikator;
          zähler = 1;
        } else {
          zähler++;
        }
      }; 
      };

    },

    addtable: function () {
      this.tables++;
      this.fontsize.push({name:[]})
      this.items.push({name:[]})
      this.textareas.push({name:[]})
      this.loadtablelength();
      this.changetable(this.tables, 0, true);
    },

    removetable: function () {
      if (this.tables > 1){
        this.fontsize.splice(this.tables, 1)
        this.items.splice(this.tables, 1)
        this.textareas.splice(this.tables, 1)
        this.tables--;
      };
    },
      printInfo: function () {
        window.print();
    },
  },


  mytestfunction: function(){

  },

}).mount('#app')

