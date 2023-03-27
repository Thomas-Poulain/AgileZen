
const { createApp } = Vue
createApp({
    data() {
        return {
            projects: [],
            data: [],
            selectedProject:"",
            url:"http://localhost:3000/project/"
        }
    },
    methods: {
        format: function (inputDate) {
            var date = new Date(inputDate);
            if (!isNaN(date.getTime())) {
                // Months use 0 index.
                console.log(date.getTime())
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            }
        },
        setResults: function (res) {
            this.activities = res
        },
        showDetails: function (project) {
            this.selectedProject = project;
            $('#activityModal').modal('show'); // afficher la modal Bootstrap
        }   

    },
    mounted(){
        fetch(this.url).then(res => {
                return res.json();
        }).then(this.setResults);
    }
}).mount('.app')

