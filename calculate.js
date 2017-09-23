$.getJSON('data.json', function(json) {
    app.data = json;
});

var app = new Vue({
    el: '#calculate',
    data: {
        title: 'КАЛЬКУЛЯТОР ТЕХНОЛОГИЧЕСКОГО ПРИСОЕДИНЕНИЯ',
        S1: 0, //вид заявки (1 - постоянное, 2 - временное)
        Category: 3,
        N: 16, //заявленная мощность
        Conditions: true, //признак условия
        Build: true, //необходимо строительство
        BuildTP: false,
        BuildTP_radio: 0,
        Calculate: 2, //расчет по power-мощности, standart-стандартизированной
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



        data: null, // json с константами для расчета

        resultPw: 0, // результат расчета по мощности
        resultSt: 0 // результат расчета по стандартизированной ставке

    },
    watch: {
        N: function(N) {

            if (N <= 15) {
                //ниже 15кВт
                if (this.Build) {
                    this.resultPw = this.buildPower()
                } else {
                    this.resultPw = 500
                    this.resultSt = 500
                }

            } else if (N > 15 < 150 && !this.Conditions) {
                // от 16 до 150кВт
                this.Conditions = false
                this.resultPw = N * this.data.C1.max150
                this.resultSt = N * this.data.C1.max150
            } else if (N > 150) {

            }


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

        //округляем результаты
        resultPw: function(e) {
            this.resultPw = Math.round(e * 100) / 100
        },
        resultSt: function(e) {
            this.resultSt = Math.round(e * 100) / 100
        }
    },
    methods: {
        r: function(e) {
            console.log(+e + 1)
        },
        buildPower: function() {
            var arr = [];
            (this.Ch2_1) ? arr[0] = +this.data.Power.min150.Cm2_1: arr[0] = 0

            return +this.N * Number(this.data.C1.max15) + (+this.N + arr[0])
        },
        buildStandart: function() {

        }
    },
    computed: {
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
                    //console.log(n.target.value)
            })

            $('input[name=BuildTP_radio]').change(function(n) {
                self.BuildTP_radio = n.target.value
                    //console.log(n.target.value)
            })
        })
    }

})