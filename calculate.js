/*
 * @author  Vershkov Egor
 * @03/10/17
 */

$.getJSON('data.json', function(json) {
    app.j = json
});

var app = new Vue({
    el: '#calculate',
    data: {
        S1: 0, //вид заявки (1 - постоянное, 2 - временное)
        Category: 0,
        N: "", //заявленная мощность
        Conditions: false, //признак условия
        Build: false, //необходимо строительство
        BuildTP: false, //строительство ТП
        Show_BuildTP: true, //показывать блок строительства ТП
        BuildTP_radio_1: 0, //по мощности 
        BuildTP_radio_2: 0, //по стандартизированной
        Calculate: 0, //расчет по power-мощности, standart-стандартизированной
        VoltageClass: 0, //Класс напряжения
        Lines_one: [{
            "id": 0,
            "select": 0,
            "index": 0,
            "L": "",
        }], //Линии
        Lines_two: [{
            "id": 0,
            "select": 0,
            "index": 0,
            "L": "",
        }], //Линии
        hover: false,

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

        //отображать/скрывать элементы
        Show_Ch2_1: false,
        Show_Ch2_2: false,
        Show_Ch2_3: false,
        Show_Ch2_4: false,
        Show_Ch3_1: false,
        Show_Ch3_2: false,
        Show_Ch3_1_1: false,
        Show_Ch3_2_1: false,
        Show_Ch2__2_1: false,
        Show_Ch2__2_2: false,
        Show_Ch2__2_3: false,
        Show_Ch2__2_4: false,
        Show_Ch2__3_1: false,
        Show_Ch2__3_2: false,
        Show_Ch2__3_1_1: false,
        Show_Ch2__3_2_1: false,

        //Отоброжать строительство ТП
        radio1: false,
        radio2: false,
        radio3: false,
        radio4: false,
        radio5: false,
        radio6: false,
        radio7: false,
        radio8: false,
        radio9: false,
        radio10: false,
        radio11: false,
        radio12: false,
        radio13: false,
        radio14: false,

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
        },
        VoltageClass: function() {
            this.resetAllBuilds()
        },
        Calculate: function() {
            this.resetAllBuilds()
        }
    },
    methods: {
        addLine: function(lineNumber) {
            if (lineNumber == 'one' || lineNumber == 'two') {
                this["Lines_" + lineNumber].push({
                    "id": this["Lines_" + lineNumber].length,
                    "select": 0,
                    "index": 0,
                    "L": "",
                })
            }
        },
        deleteLine: function(lineNumber) {
            if (lineNumber == 'one' || lineNumber == 'two') {
                this["Lines_" + lineNumber].pop()
            }
        },
        resetAllBuilds: function() {
            this.BuildTP = false

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
        showRadio: function(arr) {
            //Сбрасываем значения
            for (var i = 1; i <= 14; i++) {
                this["radio" + i] = false
            }
            if (Array.isArray(arr)) {
                arr.forEach(function(element, i) {
                    this["radio" + element] = true
                }, this);
            }
        },
        showCheckbox: function(arr) {
            if (Array.isArray(arr) && arr.length > 0) {
                this.Show_Ch2_1 = false
                this.Show_Ch2_2 = false
                this.Show_Ch2_3 = false
                this.Show_Ch2_4 = false
                this.Show_Ch3_1 = false
                this.Show_Ch3_2 = false
                this.Show_Ch3_1_1 = false
                this.Show_Ch3_2_1 = false

                arr.forEach(function(element, i) {
                    if (element === 21) { this.Show_Ch2_1 = true }
                    if (element === 22) { this.Show_Ch2_2 = true }
                    if (element === 23) { this.Show_Ch2_3 = true }
                    if (element === 24) { this.Show_Ch2_4 = true }
                    if (element === 31) { this.Show_Ch3_1 = true }
                    if (element === 32) { this.Show_Ch3_2 = true }
                    if (element === 311) { this.Show_Ch3_1_1 = true }
                    if (element === 321) { this.Show_Ch3_2_1 = true }
                }, this)
            }
        },
        result: function(e) {
            if (e) {
                e += e * 18 / 100 // +18% НДС
                return (Math.round(e * 100) / 100) //округляем результаты
            } else {
                return 0
            }
        },
        index: function(e, lineNumber) {
            if (lineNumber == 'one' || lineNumber == 'two') {
                if (e.select >= '1' && e.select <= '4') {
                    this["Lines_" + lineNumber][e.id].index = this.j.Z.VL
                }
                if (e.select >= '5' && e.select <= '8') {
                    this["Lines_" + lineNumber][e.id].index = this.j.Z.KL
                }
            }
        }
    },
    computed: {
        //Расчет по мощности
        resultPw: function() {
            if (this.j && this.N !== 0) {
                var x = 0
                var N = Number(this.N)
                var max = "max150"
                var cmax = "max15"

                //меньше 15 без строительства
                if (N <= 15 && !this.Conditions && N) {
                    if (this.Category == 3 || this.Category == 0){
                        return 550
                    }
                }

                //для временного присоединения
                if (this.S1 == 2) {
                    this.Conditions == false
                    this.Build == false
                }

                //для любого присоединения
                if (N > 15) {
                    cmax = "max150"
                }
                if (N <= 15) {
                    cmax = "max15"
                }

                //расчетная часть без строительства
                x = N * Number(this.j.C1[cmax])

                //Строительство
                if (this.Build && this.S1 !== 2) {
                    //для постоянного присоединения
                    // до 15
                    if (N <= 15) {
                        max = "max150"
                        if (this.Conditions || this.Category !== 2) {
                            if (this.VoltageClass == 1) {
                                this.showCheckbox([21, 23, 31, 32, 311])
                            }
                            if (this.VoltageClass == 2) {
                                this.showCheckbox([23, 32])
                            }

                            //прячем строительство ТП если класс 6-10
                            if (this.VoltageClass == 2) { this.Show_BuildTP = false } else { this.Show_BuildTP = true }

                            if (this.Category == 3) { this.showRadio([1]) }
                            if (this.Category == 2) { this.showRadio([9]) }
                        } else {
                            return 550
                        }
                    }

                    // от 16 до 150
                    if (N > 15 && N <= 150) {
                        max = "max150"
                        if (this.VoltageClass == 1) {
                            this.showCheckbox([21, 23, 31, 32, 311])
                        }
                        if (this.VoltageClass == 2) {
                            this.showCheckbox([23, 32])
                        }

                        //прячем строительство ТП если класс 6-10
                        if (this.VoltageClass == 2) { this.Show_BuildTP = false } else { this.Show_BuildTP = true }

                        if (this.Category == 3) { this.showRadio([1, 2, 3, 4, 5, 6]) }
                        if (this.Category == 2) { this.showRadio([9, 10]) }
                    }

                    if (N > 150) {
                        max = "min150"
                        if (this.VoltageClass == 1) {
                            this.showCheckbox([21, 23, 31, 32, 321])
                        }
                        if (this.VoltageClass == 2) {
                            this.showCheckbox([23, 32, 321])
                        }

                        //прячем строительство ТП если класс 6-10
                        if (this.VoltageClass == 2) { this.Show_BuildTP = false } else { this.Show_BuildTP = true }

                        if (this.Category == 3) { this.showRadio([6, 7, 8, 9, 10, 11, 12, 13, 14]) }
                        if (this.Category == 2) { this.showRadio([6, 7, 8, 10, 11, 12, 13, 14]) }
                    }

                    /////////////////////////////

                    //первый источник
                    if (this.Ch2_1 && this.Show_Ch2_1) { x += (Number(this.j.Power[max].Cm2_1) * N) }
                    if (this.Ch2_2 && this.Show_Ch2_2) { x += (Number(this.j.Power[max].Cm2_2) * N) }
                    if (this.Ch2_3 && this.Show_Ch2_3) { x += (Number(this.j.Power[max].Cm2_3) * N) }
                    if (this.Ch2_4 && this.Show_Ch2_4) { x += (Number(this.j.Power[max].Cm2_4) * N) }

                    if (this.Ch3_1 && this.Show_Ch3_1) { x += (Number(this.j.Power[max].Cm3_1) * N) }
                    if (this.Ch3_2 && this.Show_Ch3_2) { x += (Number(this.j.Power[max].Cm3_2) * N) }
                    if (this.Ch3_1_1 && this.Show_Ch3_1_1) { x += (Number(this.j.Power[max].Cm3_1_1) * N) }
                    if (this.Ch3_2_1 && this.Show_Ch3_2_1) { x += (Number(this.j.Power[max].Cm3_2_1) * N) }

                    if (this.Category == 2) {
                        //второй источник
                        if (this.Ch2__2_1 && this.Show_Ch2_1) { x += (Number(this.j.Power[max].Cm2_1) * N) }
                        if (this.Ch2__2_2 && this.Show_Ch2_2) { x += (Number(this.j.Power[max].Cm2_2) * N) }
                        if (this.Ch2__2_3 && this.Show_Ch2_3) { x += (Number(this.j.Power[max].Cm2_3) * N) }
                        if (this.Ch2__2_4 && this.Show_Ch2_4) { x += (Number(this.j.Power[max].Cm2_4) * N) }

                        if (this.Ch2__3_1 && this.Show_Ch3_1) { x += (Number(this.j.Power[max].Cm3_1) * N) }
                        if (this.Ch2__3_2 && this.Show_Ch3_2) { x += (Number(this.j.Power[max].Cm3_2) * N) }
                        if (this.Ch2__3_1_1 && this.Show_Ch3_1_1) { x += (Number(this.j.Power[max].Cm3_1_1) * N) }
                        if (this.Ch2__3_2_1 && this.Show_Ch3_2_1) { x += (Number(this.j.Power[max].Cm3_2_1) * N) }
                    }

                    //строительство ТП
                    if (this.BuildTP && this.Calculate !== 0 && this.VoltageClass !== 2) {
                        x += (Number(this.j.Power[max][this["BuildTP_radio_" + this.Calculate]]) * N)
                    }
                }

                //если переключились на стандартизированную ставку то обнуляем мощность
                if (this.Calculate == 2 && this.Build) { return 0 }

                //выводим результат
                return this.result(x)
            } else {
                return 0
            }
        },

        //Стандартизированная ставка
        resultSt: function() {
            if (this.j && this.N !== 0) {
                var y = 0
                var N = Number(this.N)
                var max = "max150"
                var cmax = "max15"

                //меньше 15 без строительства
                if (N <= 15 && !this.Conditions && N && this.Category !== 2) {
                    if (this.Category == 3 || this.Category == 0){
                        return 550
                    }
                }

                //для временного присоединения
                if (this.S1 == 2) {
                    this.Conditions == false
                    this.Build == false
                }

                //для любого присоединения
                if (N > 15) {
                    cmax = "max150"
                }
                if (N <= 15) {
                    cmax = "max15"
                }

                //расчетная часть без строительства
                y = N * Number(this.j.C1[cmax])
                console.log("черновик", y)
                //Строительство
                if (this.Build && this.Calculate == 2) {
                    if (N <= 15) {
                        max = "max150"
                        if (this.Conditions || this.Category !== 2) {
                            if (this.VoltageClass == 1) {
                                this.showCheckbox([21, 22, 23, 24, 31, 32, 311])
                            }
                            if (this.VoltageClass == 2) {
                                this.showCheckbox([23, 24, 32])
                            }

                            //прячем строительство ТП если класс 6-10
                            if (this.VoltageClass == 2) { this.Show_BuildTP = false } else { this.Show_BuildTP = true }

                            if (this.Category == 3) { this.showRadio([1]) }
                            if (this.Category == 2) { this.showRadio([1]) }
                        } else {
                            return 550
                        }
                    }

                    // от 16 до 150
                    if (N > 15 && N <= 150) {
                        max = "max150"
                        if (this.VoltageClass == 1) {
                            this.showCheckbox([21, 22, 23, 24, 31, 32, 311])
                        }
                        if (this.VoltageClass == 2) {
                            this.showCheckbox([23, 24, 32])
                        }

                        //прячем строительство ТП если класс 6-10
                        if (this.VoltageClass == 2) { this.Show_BuildTP = false } else { this.Show_BuildTP = true }

                        if (this.Category == 3) { this.showRadio([1, 2, 3, 4, 5, 6]) }
                        if (this.Category == 2) { this.showRadio([9, 10]) }
                    }

                    if (N > 150) {
                        max = "min150"
                        if (this.VoltageClass == 1) {
                            this.showCheckbox([22, 23, 24, 31, 32, 321])
                        }
                        if (this.VoltageClass == 2) {
                            this.showCheckbox([23, 24, 32, 321])
                        }

                        //прячем строительство ТП если класс 6-10
                        if (this.VoltageClass == 2) { this.Show_BuildTP = false } else { this.Show_BuildTP = true }

                        if (this.Category == 3) { this.showRadio([6, 7, 8]) }
                        if (this.Category == 2) { this.showRadio([6, 7, 8, 10, 11, 12, 13, 14]) }
                    }

                    this.Lines_one.forEach(function(e) {
                        if (e.L && e.L !== "0" && e.select !== "0") {
                            //первый источник
                            if (e.select == 1) { y += (Number(this.j.Standart[max].C2_1) * e.L * e.index) }
                            if (e.select == 2) { y += (Number(this.j.Standart[max].C2_2) * e.L * e.index) }
                            if (e.select == 3) { y += (Number(this.j.Standart[max].C2_3) * e.L * e.index) }
                            if (e.select == 4) { y += (Number(this.j.Standart[max].C2_4) * e.L * e.index) }
                            if (e.select == 5) { y += (Number(this.j.Standart[max].C3_1) * e.L * e.index) }
                            if (e.select == 6) { y += (Number(this.j.Standart[max].C3_2) * e.L * e.index) }
                            if (e.select == 7) { y += (Number(this.j.Standart[max].C3_1_1) * e.L * e.index) }
                            if (e.select == 8) { y += (Number(this.j.Standart[max].C3_2_1) * e.L * e.index) }
                            console.log("one line=", y)
                        }
                    }, this);

                    this.Lines_two.forEach(function(e) {
                        if (e.L && e.L !== "0" && e.select !== "0" && this.Category == 2) {
                            //первый источник
                            if (e.select == 1) { y += (Number(this.j.Standart[max].C2_1) * e.L * e.index) }
                            if (e.select == 2) { y += (Number(this.j.Standart[max].C2_2) * e.L * e.index) }
                            if (e.select == 3) { y += (Number(this.j.Standart[max].C2_3) * e.L * e.index) }
                            if (e.select == 4) { y += (Number(this.j.Standart[max].C2_4) * e.L * e.index) }
                            if (e.select == 5) { y += (Number(this.j.Standart[max].C3_1) * e.L * e.index) }
                            if (e.select == 6) { y += (Number(this.j.Standart[max].C3_2) * e.L * e.index); console.log("c3_2", Number(this.j.Standart[max].C3_2) * e.L * e.index)}
                            if (e.select == 7) { y += (Number(this.j.Standart[max].C3_1_1) * e.L * e.index) }
                            if (e.select == 8) { y += (Number(this.j.Standart[max].C3_2_1) * e.L * e.index) }
                            console.log("two line=", y)
                        }
                    }, this);

                    //строительство ТП
                    if (this.BuildTP && this.Calculate !== 0 && this.VoltageClass !== 2) {
                        y += (Number(this.j.Standart[max][this["BuildTP_radio_" + this.Calculate]]) * N * Number(this.j.Z.TP))
                        console.log("buildTP", y)
                    }
                }

                if (this.Calculate == 1 && this.Build) { return 0 }

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
                self.BuildTP_radio_1 = n.target.value
            })

            $('.BuildTP_radio_2').change(function(n) {
                self.BuildTP_radio_2 = n.target.value
            })
        })
    }

})