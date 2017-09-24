$.getJSON('data.json', function(json) {
    app.j = json
});

var app = new Vue({
    el: '#calculate',
    data: {
        S1: 0, //вид заявки (1 - постоянное, 2 - временное)
        Category: 0,
        N: 0, //заявленная мощность
        Conditions: false, //признак условия
        Build: false, //необходимо строительство
        BuildTP: false,
        BuildTP_radio: 0,
        Calculate: 0, //расчет по power-мощности, standart-стандартизированной
        VoltageClass: 0, //Класс напряжения
        L: 0, //длина линий

        Ch2_1: false,
        Ch2_2: false,
        Ch2_3: false,
        Ch2_4: false,

        Ch3_1: false,
        Ch3_2: false,
        Ch3_1_1: false,
        Ch3_2_1: false,

        Ch2__2_1: false,
        Ch2__2_2: false,
        Ch2__2_3: false,
        Ch2__2_4: false,

        Ch2__3_1: false,
        Ch2__3_2: false,
        Ch2__3_1_1: false,
        Ch2__3_2_1: false,

        j: null, // json с константами для расчета

    },
    watch: {
        N: function(N) {
            /*
                        if (N <= 15) {
                            //console.log(Number(this.j.C1.max150))
                            //ниже 15кВт
                            if (this.Build) {
                                // this.resultPw = this.buildPower()

                            } else {
                                //this.resultPw = 500
                                //this.resultSt = 500
                            }

                        } else if (N > 15 < 150 && !this.Conditions) {
                            // от 16 до 150кВт
                            this.Conditions = false
                                //this.resultPw = N * this.data.C1.max150
                                //this.resultSt = N * this.data.C1.max150
                        } else if (N > 150) {

                        }
            */

            if (N == 0) {
                this.resultPw = 0
                this.resultSt = 0
            }

            if (N <= 99999 && N) {
                this.N = N
            } else {
                this.N = N - 100000
            }

            if (N < 0 || !N) {
                this.N = null
            }
        },
        Calculate: function(Calculate) {
            if (Calculate == 1) { /*this.resultSt = 0*/ }
            if (Calculate == 2) { /*this.resultPw = 0*/ }
        },
        Conditions: function(Conditions) {
            if (!Conditions) {
                this.resetAllBuilds()
            }
        }
    },
    methods: {
        resetAllBuilds: function() {
            this.Build = false //необходимо строительство
            this.BuildTP = false
            this.BuildTP_radio = 0
            this.Calculate = 0 //расчет по power-мощности, standart-стандартизированной
            this.VoltageClass = 0 //Класс напряжения
            this.L = 0 //длина линий

            this.Ch2_1 = false
            this.Ch2_2 = false
            this.Ch2_3 = false
            this.Ch2_4 = false

            this.Ch3_1 = false
            this.Ch3_2 = false
            this.Ch3_1_1 = false
            this.Ch3_2_1 = false

            this.Ch2__2_1 = false
            this.Ch2__2_2 = false
            this.Ch2__2_3 = false
            this.Ch2__2_4 = false

            this.Ch2__3_1 = false
            this.Ch2__3_2 = false
            this.Ch2__3_1_1 = false
            this.Ch2__3_2_1 = false
        },
        round: function(e) {
            //округляем результаты
            return Math.round(e * 100) / 100
        }
    },
    computed: {
        resultPw: function() {
            if (this.j) {
                var arr = [];
                if (this.Ch2_1) { arr[0] = Number(this.j.Power.min150.Cm2_1) } else { arr[0] = 0 }
                if (this.Ch2_2) { arr[1] = Number(this.j.Power.min150.Cm2_2) } else { arr[1] = 0 }

                return this.round(Number(this.N) * Number(this.j.C1.max15) + (Number(this.N) + arr[0]) + (Number(this.N) + arr[1]))
            }
        },
        resultSt: function() {
            if (this.j) {

                return 500
            }
        },
        isNValid: function() {
            return (/\d{5}/).test(this.N)
        }

    },
    mounted: function() {
        var self = this

        this.$nextTick(function() {
            // Код, который будет запущен только после
            // отображения всех представлений

            $('.Category').change(function(n) {
                self.Category = n.target.value
            })

            $('input[name=BuildTP_radio]').change(function(n) {
                self.BuildTP_radio = n.target.value
            })
        })
    }

})