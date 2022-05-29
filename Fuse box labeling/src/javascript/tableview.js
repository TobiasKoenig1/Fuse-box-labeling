let vTwo = Vue.createApp({
    data() {
      return {
          TableRow: 0,
          TheadValue: [],
          TbodyValue:[],
      }
    },



    methods: {

        createtableview :function(){
          console.log("test");
            this.TableRow = 0;
            for (let i = 0; i < vOne.Tables +1; i++) {
                for(let a = 0; a < vOne.TablesLength +1; a++)
                if (vOne.TextAreas[i].Index[a] === true) {
                  this.TableRow++;
                  this.TheadValue[this.TableRow] = vOne.TheadValue[i].Index[a];
                  this.TbodyValue[this.TableRow] = vOne.TbodyValue[i].Index[a];
                }
              }
        },
    }
  }).mount('#vTwo')