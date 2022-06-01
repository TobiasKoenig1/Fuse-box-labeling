let vMenu = Vue.createApp({
    data() {
      return {

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
            vOne.printInfo();
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