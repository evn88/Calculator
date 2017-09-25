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
            return Math.round(e * 100) / 100 //округляем результаты
        },
        min15: function() {

        }
    },
    computed: {
        resultPw: function() {
            if (this.j && this.N !== 0) {
                var arr = [];
                for (var i = 0; i <= 1; i++) {
                    //console.log(this.j.Power.max150.Cm2[i])
                }

                //формула для расчета по мощности 2й категории без ТП
                //C1 * N +  ∑ (C2,i * N) +  ∑ (C3,i * N) +  ∑ (C2,i N) + ( ∑ (C3,i * N)  + строительство ТП  ∑ (C4,i * N) 
                var x = 0
                x = Number(this.N) * Number(this.j.C1.max15)

                //первый источник
                if (this.Ch2_1) { x += (Number(this.j.Power.max150.Cm2_1) * Number(this.N)) }
                if (this.Ch2_2) { x += (Number(this.j.Power.max150.Cm2_2) * Number(this.N)) }

                if (this.Ch3_1) { x += (Number(this.j.Power.max150.Cm3_1) * Number(this.N)) }
                if (this.Ch3_2) { x += (Number(this.j.Power.max150.Cm3_2) * Number(this.N)) }
                if (this.Ch3_1_1) { x += (Number(this.j.Power.max150.Cm3_1_1) * Number(this.N)) }
                if (this.Ch3_2_1) { x += (Number(this.j.Power.max150.Cm3_2_1) * Number(this.N)) }

                //второй источник
                if (this.Ch2__2_1) { x += (Number(this.j.Power.max150.Cm2_1) * Number(this.N)) }
                if (this.Ch2__2_2) { x += (Number(this.j.Power.max150.Cm2_2) * Number(this.N)) }

                if (this.Ch2__3_1) { x += (Number(this.j.Power.max150.Cm3_1) * Number(this.N)) }
                if (this.Ch2__3_2) { x += (Number(this.j.Power.max150.Cm3_2) * Number(this.N)) }
                if (this.Ch2__3_1_1) { x += (Number(this.j.Power.max150.Cm3_1_1) * Number(this.N)) }
                if (this.Ch2__3_2_1) { x += (Number(this.j.Power.max150.Cm3_2_1) * Number(this.N)) }

                if (this.BuildTP) {
                    if (this.C4_1) { x += (Number(this.j.Power.max150.Cm4_1) * Number(this.N)) }
                    if (this.C4_2) { x += (Number(this.j.Power.max150.Cm4_2) * Number(this.N)) }
                    if (this.C4_3) { x += (Number(this.j.Power.max150.Cm4_3) * Number(this.N)) }
                    if (this.C4_4) { x += (Number(this.j.Power.max150.Cm4_4) * Number(this.N)) }
                    if (this.C4_5) { x += (Number(this.j.Power.max150.Cm4_5) * Number(this.N)) }
                    if (this.C4_6) { x += (Number(this.j.Power.max150.Cm4_6) * Number(this.N)) }
                    if (this.C4_7) { x += (Number(this.j.Power.max150.Cm4_7) * Number(this.N)) }
                    if (this.C4_8) { x += (Number(this.j.Power.max150.Cm4_8) * Number(this.N)) }
                    if (this.C4_9) { x += (Number(this.j.Power.max150.Cm4_9) * Number(this.N)) }
                    if (this.C4_10) { x += (Number(this.j.Power.max150.Cm4_10) * Number(this.N)) }
                    if (this.C4_11) { x += (Number(this.j.Power.max150.Cm4_11) * Number(this.N)) }
                    if (this.C4_12) { x += (Number(this.j.Power.max150.Cm4_12) * Number(this.N)) }
                    if (this.C4_13) { x += (Number(this.j.Power.max150.Cm4_13) * Number(this.N)) }
                    if (this.C4_14) { x += (Number(this.j.Power.max150.Cm4_14) * Number(this.N)) }
                }

                //3я категория
                //C1 * N +  ∑ (C2,i * N) +  ∑ (C3,i * N) + строительство ТП  ∑ (C4,i * N) 


                return this.round(x)
            } else {
                return 0
            }
        },
        resultSt: function() {
            if (this.j && this.N !== 0) {
                return 500
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

            $('input[name=BuildTP_radio]').change(function(n) {
                self.BuildTP_radio = n.target.value
            })
        })
    }

})