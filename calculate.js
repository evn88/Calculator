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
        BuildTP_radio_1: 0,
        BuildTP_radio_2: 0,
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
        S1: function() {
            this.resetAllBuilds()
        }
    },
    methods: {
        resetAllBuilds: function() {
            this.N = 0
            this.Build = false //необходимо строительство
            this.BuildTP = false
            this.BuildTP_radio_1 = 0
            this.BuildTP_radio_2 = 0
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
        result: function(e) {
            if (e) {
                e += e * 18 / 100 // +18% НДС
                return (Math.round(e * 100) / 100) //округляем результаты
            } else {
                return 0
            }
        },
        min15: function() {

        }
    },
    computed: {
        resultPw: function() {
            if (this.j && this.N !== 0) {
                var x = 0
                var N = Number(this.N)
                    //формула для расчета по мощности 2й категории без ТП
                    //C1 * N +  ∑ (C2,i * N) +  ∑ (C3,i * N) +  ∑ (C2,i N) + ( ∑ (C3,i * N)  + строительство ТП  ∑ (C4,i * N) 
                if (N <= 15 && !this.Conditions) {
                    return 550
                }

                if (N <= 15) {
                    x = N * Number(this.j.C1.max15)
                }
                if (N > 15 || this.S1 == 2) {
                    x = N * Number(this.j.C1.max150)
                }

                if (this.Build) {
                    //первый источник
                    if (this.Ch2_1) { x += (Number(this.j.Power.max150.Cm2_1) * N) }
                    if (this.Ch2_2) { x += (Number(this.j.Power.max150.Cm2_2) * N) }

                    if (this.Ch3_1) { x += (Number(this.j.Power.max150.Cm3_1) * N) }
                    if (this.Ch3_2) { x += (Number(this.j.Power.max150.Cm3_2) * N) }
                    if (this.Ch3_1_1) { x += (Number(this.j.Power.max150.Cm3_1_1) * N) }
                    if (this.Ch3_2_1) { x += (Number(this.j.Power.max150.Cm3_2_1) * N) }

                    //второй источник
                    if (this.Ch2__2_1) { x += (Number(this.j.Power.max150.Cm2_1) * N) }
                    if (this.Ch2__2_2) { x += (Number(this.j.Power.max150.Cm2_2) * N) }

                    if (this.Ch2__3_1) { x += (Number(this.j.Power.max150.Cm3_1) * N) }
                    if (this.Ch2__3_2) { x += (Number(this.j.Power.max150.Cm3_2) * N) }
                    if (this.Ch2__3_1_1) { x += (Number(this.j.Power.max150.Cm3_1_1) * N) }
                    if (this.Ch2__3_2_1) { x += (Number(this.j.Power.max150.Cm3_2_1) * N) }

                    if (this.BuildTP && this.Calculate !== 0) {
                        console.log(this["BuildTP_radio_" + this.Calculate])
                        x += (Number(this.j.Power.max150[this["BuildTP_radio_" + this.Calculate]]) * N)
                    }
                }

                //3я категория
                //C1 * N +  ∑ (C2,i * N) +  ∑ (C3,i * N) + строительство ТП  ∑ (C4,i * N) 


                return this.result(x)
            } else {
                return 0
            }
        },
        resultSt: function() {
            if (this.j && this.N !== 0) {
                var y = 0

                if (this.N <= 15 && !this.Conditions) {
                    return 550
                }

                return this.result(y)
            } else {
                return 0
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

            $('.BuildTP_radio_1').change(function(n) {
                console.log("change: ", n.target.value)
                self.BuildTP_radio_1 = n.target.value
            })

            $('.BuildTP_radio_2').change(function(n) {
                self.BuildTP_radio_2 = n.target.value
            })
        })
    }

})