const { createApp } = Vue
createApp({
    data() {
        return {
            tasks: [],
            data: [],
            selectedTask:"",
            url:"http://localhost:3000/task/"
        }
    },
    methods: {
        format: function (inputDate) {
            var date = new Date(inputDate);
            if (!isNaN(date.getTime())) {
                // Months use 0 index.
                var jour = "" + date.getDate();
                if(date.getDate() < 10){
                    jour = '0' + jour
                }

                var mois = "" + (String)(parseInt(date.getMonth())+1);
                if(date.getMonth()+1 < 10){
                    mois  = '0' + mois
               }

               var ans = "" + date.getFullYear();
                if(date.getFullYear() < 1000){
                    ans = '0' + ans
                } 
                if (date.getFullYear() < 100){
                    ans = '0' + ans
                }
                if (date.getFullYear() < 10){
                    ans = '0' + ans
                }
                return jour + '/' + mois + '/' + ans;
            }
        },
        setResults: function (res) {
            this.tasks = res
        },
        showDetails: function (task) {
            this.selectedTask = task;
            $('#activityModal').modal('show'); // afficher la modal Bootstrap
        }   

    },
    mounted(){
        fetch(this.url).then(res => {
                return res.json();
        }).then(this.setResults);
    }
}).mount('.app')

