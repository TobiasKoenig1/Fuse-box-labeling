let vMenu = Vue.createApp({
  data() {
    return {
      Page: false,

      Visibility: false,
      Pages: 3,
      CheckedValue: 1,
    }
  },

  //pre load Funktions
  created() {
    this.switchpage(this.CheckedValue);
  },


  methods: {


    switchpage: function (ViewedPage) {

        this.Page = true;
        vOne.Page = true;
        vTwo.Page = true;
        vThree.Page = true;

        switch (ViewedPage) {
          case 1:
            vOne.Page = false;
            break;
          case 2:
            vTwo.Page = false;
            break;
          case 3:
            vThree.Page = false;
            break;
          default:
            console.log("error load page")
            break;
        }

    },

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

    createtableview: function () {
      vTwo.createtableview();
    },

    exportjsonfilestream: function () {
      vThree.exportjsonfilestream();
    },

    exportjsonfile: function () {
      vThree.exportjsonfile();
    },

    importjsonfile: function () {
      vThree.importjsonfile();
    },

  }
}).mount('#vMenu')