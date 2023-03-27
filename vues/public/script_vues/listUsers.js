
const { createApp } = Vue
createApp({
    data() {
        return {
            users: [],
            url:"http://localhost:8081/users/"
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
            this.users = res
        }

    },
    mounted(){
        fetch(this.url).then(res => {
                return res.json();
        }).then(this.setResults);

    }
}).mount('.app')

