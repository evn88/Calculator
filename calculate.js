$.getJSON('data.json', function(json) {
    app.data = json;
});

var app = new Vue({
    el: '#calculate',
    data: {
        title: 'КАЛЬКУЛЯТОР ТЕХНОЛОГИЧЕСКОГО ПРИСОЕДИНЕНИЯ',
        S1: 0, //вид заявки (1 - постоянное, 2 - временное)
        Category: 0,
        N: 0, //заявленная мощность
        Conditions: false, //признак условия
        Build: false, //необходимо строительство
        BuildTP: false,
        Calculate: 0, //расчет по power-мощности, standart-стандартизированной
        VoltageClass: 0, //Класс напряжения
        L: 0, //длина линий

        Ch2_1: false,
        Ch2_2: false,
        Ch2_3: false,
        Ch2_4: false,

        data: null, // json с константами для расчета

        resultPw: 0, // результат расчета по мощности
        resultSt: 0 // результат расчета по стандартизированной ставке

    },
    watch: {
        N: function(N) {

            if (N <= 15) {
                this.resultPw = 500
                this.resultSt = 500
            } else if (N > 15 < 150 && !this.Conditions) {
                this.Conditions = false
                this.resultPw = N * this.data.C1.max150
                this.resultSt = N * this.data.C1.max150
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
    computed: {
        isNValid: function() {
            return (/\d{5}/).test(this.N)
        },
        treeCat: function(e) {
            return e + 1
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
        })
    }

})