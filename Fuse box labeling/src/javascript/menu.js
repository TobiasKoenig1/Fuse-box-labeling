let vMenu = Vue.createApp({
    data() {
      return {
        Visibility: false,
      }
    },

    methods: {
        addtable: function () {
           vOne.addtable();
          },

        removetable: function () {
            vOne.removetable();

          },

          printInfo: function () {

              this.Visibility = true;
              vOne.Visibility = true;
              vTwo.Visibility = true;
              vThree.Visibility = true;
            
            setTimeout(() => window.print(), 1);

            setTimeout(() => this.Visibility = false, 1);
            setTimeout(() => vOne.Visibility = false, 1);
            setTimeout(() => vTwo.Visibility = false, 1);
            setTimeout(() => vThree.Visibility = false, 1);


          },

          createtableview :function(){
            vTwo.createtableview();
          },

            exportjsonfile: function () {
          vThree.exportjsonfile();
          },

          importjsonfile: function () {
            vThree.importjsonfile();
        },
      
    }
  }).mount('#vMenu')