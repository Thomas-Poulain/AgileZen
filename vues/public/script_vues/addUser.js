
const { createApp } = Vue
createApp({
    data() {
        return {
            user: {},
            nom:"",
            prenom:"",
            dateNaissance:"",
            sexe:"",
            poids:"",
            taille:"",
            emailCreation: "",
            passwordCreation: "",
            url:"http://localhost:8081/users/"
        }
    },
    methods: {
        addUser: function(){
            console.log("test")
            console.log(this.format(this.dateNaissance))
            var dateN = this.format(this.dateNaissance) 
            var newUser = {
                nom: this.nom,
                prenom: this.prenom,
                dateNaissance: dateN,
                sexe: this.sexe,
                taille:this.taille,
                poids:this.poids,
                email: this.emailCreation,
                motDePasse: this.passwordCreation,
            }
            axios.post(this.url,newUser).then((response) => {
                console.log(response.data)
            })
        },
        format: function (inputDate) {
            var date = new Date(inputDate);
            if (!isNaN(date.getTime())) {
                // Months use 0 index.
                var jour = "" + date.getDate();
                if(date.getDate() < 10){
                    jour = '0' + jour
                }

                var mois = "" + date.getMonth();
                if(date.getMonth() < 10){
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
            this.users = res
        }

    }
}).mount('.app')

