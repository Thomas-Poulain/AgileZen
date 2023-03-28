/*

        removeTask: function(task){
            this.tasks = this.tasks.filter(t => t.id != task.id)
            //this.tasks.splice(task);
        },

        //is subdivided in smaller functions 
        removeCompleted: function(){
            this.tasks = this.tasks.filter(this.getUnended);
        },
        //searches for every on going tasks
        getUnended(task) {
            return ! this.isCompleted(task);
        },
        //return if the current taks is completed or not
        isCompleted(task) {
            return task.completed;
        } 
    }, 

    //is called each time the app is mounted, check if something is saved in local and readd it to the tasks if yes
    mounted(){
        console.log('App Mounted');
            if (localStorage.getItem('tasks')) 
                this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
}).mount('.app')
*/

const { createApp } = Vue
createApp({
    data() {
        return {
            projects: [],
            selectedProject:"",
            url:"http://localhost:3000/project/",
            name:"New project",
            description: "LoremIpsum",
            startDate: "",
            deadline: "",
            status: "todo",
            employee: [
                { name: '', role: 'maintainer' }
            ],
            statusFilter : "",
            dateFilter: "",
            keywordFilter: ""
        }
    },
    computed: {
        filters() {
            console.log("test")
            if(this.statusFilter != ""){
                if(this.dateFilter != ""){
                    if(this.keywordFilter != ""){
                        console.log("test")
                        return this.projects.filter(project => (project.status.toLowerCase() == this.statusFilter) 
                        && ( (this.format(project.deadline).includes(this.dateFilter)) || (this.format(project.startDate).includes(this.dateFilter)))
                        && ((project.description.includes(this.keywordFilter)) || (project.name.includes(this.keywordFilter))))    
                    }
                    return this.projects.filter(project => (project.status == this.statusFilter) 
                        && ( (this.format(project.deadline).includes(this.dateFilter)) || (this.format(project.startDate).includes(this.dateFilter))))
                }
                return this.projects.filter(project => (project.status == this.statusFilter))
            }

            if(this.dateFilter != ""){
                if(this.keywordFilter != ""){
                    return this.projects.filter(project => ((this.format(project.deadline).includes(this.dateFilter)) || (this.format(project.startDate).includes(this.dateFilter)))
                    && (project.description.includes(this.keywordFilter)) || (project.name.includes(this.keywordFilter)))    
                }
                return this.projects.filter(project => ((this.format(project.deadline).includes(this.dateFilter)) || (this.format(project.startDate).includes(this.dateFilter))))
            }

            if(this.keywordFilter != ""){
                return this.projects.filter(project => (project.description.includes(this.keywordFilter)) || (project.name.includes(this.keywordFilter)))    
            }

            return this.projects
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
            this.projects = res
            console.log(this.projects)
        },
        showDetails: function (project) {
            this.selectedProject = project;
            $('#activityModal').modal('show'); // afficher la modal Bootstrap
        },
        addEmployee: function() {
            this.employee.push({ name: '', role: 'maintainer' });
        },
        removeEmployee: function(index) {
            this.employee.splice(index, 1);
        },
        deleteProj: function(project){
            console.log("test")
            var id = project._id
            console.log(id)
            axios.delete((this.url+id)).then((response) => {
                console.log(response.data)
                this.updateDisplay()
            })
        },
        deleteAll: function(){
            axios.delete(this.url).then((response) => {
                console.log(response.data)
                this.updateDisplay()
            })
        },
        submitForm: function() {

            console.log(this.startDate)
            if(this.startDate != ""){
                this.startDate = new Date(this.startDate).toISOString();    
            }
            if(this.deadline != ""){
                this.deadline = new Date(this.deadline).toISOString();    
            }
            const formData = {
                _id: this.searchId(),
                name: this.name,
                description: this.description,
                startDate: this.startDate,
                deadline: this.deadline,
                status: this.status,
                employee: this.employee
                };
            console.log(formData)
            axios.post(this.url,formData).then((response) => {
                console.log(response.data)
                this.updateDisplay()
            })
        },
        searchId: function() {
            var i = 0;
            var found = false;
            while(!found){
                var list = this.projects.filter(project => (project._id == i));
                console.log(i, list);
                if(list.length === 0){
                    found = true;
                    return i;
                }
                i++;
            }
        },        
        updateDisplay: function(){
            fetch(this.url).then(res => {
                return res.json();
            }).then(this.setResults);    
            console.log("update",this.projects)
        }

    },
    mounted(){
        this.updateDisplay()
    }
}).mount('.app')

