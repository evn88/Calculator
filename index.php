<link rel="stylesheet" href="/about/test/main.css">
<link rel="stylesheet" href="/about/test/response.css">
<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetPageProperty("TEXT_ON_IMAGE", "Калькулятор технологического присоединения");
$APPLICATION->SetPageProperty("BG_IMAGE", "/local/templates/voel/i/bg/price.jpg");
$APPLICATION->SetTitle("Калькулятор технологического присоединения");
?>

<div class="wrapper" id="calculate">

        <!-- вид заявки / категория / мощность -->
        <div id="first">
            <div class="left form-box">
                <div class="select_calc">
                    <select size="1" v-model="S1" class="no_styled">
                        <option value="0" disabled selected> Вид заявки </option>
                        <option value="1">1. Постоянное присоединение</option>
                        <option value="2">2. Временное присоединение</option>
                    </select>
                </div>
                <div class="input_1">
                    <label>Заявляемая мощность
                    <input type="number" id="N" min="0" max="99999" v-model.number="N" :disabled="S1==0 || Category==0" required>
                    кВт</label>
                    <br>
                    <p class="errortext" v-show="N && isNValid">Вы ввели максимально допустимое количество символов</p>
                </div>
            </div>

            <div class="right">
                <div class="input">
                    <p class="safe"> Категория надежности </p>
                    <p>
                        <label>
                            <input class="Category" type="radio" name="Category" value="3" v-model="Category" checked> 3 – <span>Питание</span> от одного <span>независимого</span> источника
                        </label>
                    </p>
                    <p>
                        <label v-show="S1!=2">
                            <input class="Category" type="radio" name="Category" value="2" v-model="Category" :disabled="S1 == 2"> 2 – <span>Питание</span> от двух <span>независимых</span> источников
                        </label>
                    </p>
                </div>
            </div>
        </div>

        <!-- при условиях -->
        <div id="second">
            <div class="check" v-if="N<=15 && S1 == 1 && S1!==0 && Category!==0">
                <p>
                    <label>
                        <input type="checkbox" value="check" v-model.lazy="Conditions" key="Conditions-checkbox">
                        <span class="jq-checkbox"  :class="{ checked: Conditions }"></span> При условиях:
                    </label>
                </p>
                <ul>
                    <li> если в границах муниципальных районов, городских округов и на внутригородских территориях городов федерального значения одно и то же лицо может осуществить технологическое присоединение энергопринимающих устройств, принадлежащих ему на праве собственности или на ином законном основании, с платой за технологическое присоединение в размере, не превышающем 550 рублей, не более одного раза в течение 3 лет.</li>
                    <li> при технологическом присоединении энергопринимающих устройств, принадлежащих лицам, владеющим земельным участком по договору аренды, заключенному на срок не более одного года, на котором расположены присоединяемые энергопринимающие устройства;</li>
                    <li> при технологическом присоединении энергопринимающих устройств, расположенных в жилых помещениях многоквартирных домов.</li>
                </ul>
            </div>
        </div>

        <!-- класс напряжения / строительство / расчет по -->
        <div id="third">
            <div id="build" v-show="Conditions || S1 == 1 && N>15">
                <div class="check">
                    <p>
                        <label>
                            <input type="checkbox" value="check" v-model.lazy="Build" class="no_styled">
                            <span class="jq-checkbox" :class="{ checked: Build }"></span> Необходимо строительство
                        </label>
                    </p>
                </div>
                <br>
                <div class="select">
                    <select size="1" v-model.lazy="VoltageClass" class="no_styled">
                        <option value="0" disabled selected> Класс напряжения </option>
                        <option value="1">0,4 кВ</option>
                        <option value="2">6 (10) кВ</option>
                    </select>
                </div>
                <div class="calc">
                    <select size="1" v-model.lazy="Calculate" class="no_styled">
                        <option value="0" disabled selected> Расчет по: </option>
                        <option value="1">Мощности</option>
                        <option value="2">Стандартизированной ставке</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- по мощности -->
        <div id="forth" v-show="Conditions && VoltageClass !==0 && Build && Calculate == 1 || S1 == 1 && N>15 && VoltageClass !==0 && Build && Calculate == 1">
            <p class="options">Параметры для расчета стоимости по ставке за максимальную мощность</p>
            <div class="wrap">
                <div class="source">
                    <p class="in">Строительство линий по первому источнику питания</p>
                    <div class="inner_wrap">
                        <div class="left">
                            <p v-show="VoltageClass == 1"><label><input type="checkbox" name="Ch2_1" v-model.lazy="Ch2_1"><span class="jq-checkbox" :class="{ checked: Ch2_1 }"></span> Воздушная линия 0,4кВ</label></p>
                            <p v-show="VoltageClass == 1"><label><input type="checkbox" name="Ch2_2" v-model.lazy="Ch2_2"><span class="jq-checkbox" :class="{ checked: Ch2_2 }"></span> Воздушная линия изолированная 0,4кВ</label></p>
                            <p v-show="VoltageClass == 2"><label><input type="checkbox" name="Ch2_3" v-model.lazy="Ch2_3"><span class="jq-checkbox" :class="{ checked: Ch2_3 }"></span> Воздушная линия 6-10кВ</label></p>
                            <p v-show="VoltageClass == 2"><label><input type="checkbox" name="Ch2_4" v-model.lazy="Ch2_4"><span class="jq-checkbox" :class="{ checked: Ch2_4 }"></span> Воздушная линия изолированная 6-10кВ</label></p>
                        </div>
                        <div class="right">
                            <p v-show="VoltageClass == 1"><label><input type="checkbox" name="Ch3_1" v-model.lazy="Ch3_1"><span class="jq-checkbox" :class="{ checked: Ch3_1 }"></span> Кабельная линия 0,4кВ</label></p>
                            <p v-show="VoltageClass == 2"><label><input type="checkbox" name="Ch3_2" v-model.lazy="Ch3_2"><span class="jq-checkbox" :class="{ checked: Ch3_2 }"></span> Кабельная линия 6-10кВ</label></p>
                            <p v-show="VoltageClass == 1"><label><input type="checkbox" name="Ch3_1_1" v-model.lazy="Ch3_1_1"><span class="jq-checkbox" :class="{ checked: Ch3_1_1 }"></span> Кабельная линия 0,4кВ с приминением ГНБ*</label></p>
                            <p v-show="VoltageClass == 2"><label><input type="checkbox" name="Ch3_2_1" v-model.lazy="Ch3_2_1"><span class="jq-checkbox" :class="{ checked: Ch3_2_1 }"></span> Кабельная линия 6(10)кВ с приминением ГНБ*</label></p>
                        </div>
                    </div>
                </div>
                <div class="source" v-show="Category == 2">
                    <p class="in">Строительство линий по второму источнику питания</p>
                    <div class="inner_wrap">
                        <div class="left">
                            <p v-show="VoltageClass == 1"><label><input type="checkbox" name="Ch2__2_1" v-model="Ch2__2_1"><span class="jq-checkbox" :class="{ checked: Ch2__2_1 }"></span> Воздушная линия 0,4кВ</label></p>
                            <p v-show="VoltageClass == 1"><label><input type="checkbox" name="Ch2__2_2" v-model="Ch2__2_2"><span class="jq-checkbox" :class="{ checked: Ch2__2_2 }"></span> Воздушная линия изолированная 0,4кВ</label></p>
                            <p v-show="VoltageClass == 2"><label><input type="checkbox" name="Ch2__2_3" v-model="Ch2__2_3"><span class="jq-checkbox" :class="{ checked: Ch2__2_3 }"></span> Воздушная линия 6-10кВ</label></p>
                            <p v-show="VoltageClass == 2"><label><input type="checkbox" name="Ch2__2_4" v-model="Ch2__2_4"><span class="jq-checkbox" :class="{ checked: Ch2__2_4 }"></span> Воздушная линия изолированная 6-10кВ</label></p>
                        </div>
                        <div class="right">
                            <p v-show="VoltageClass == 1"><label><input type="checkbox" name="Ch2__3_1" v-model="Ch2__3_1"><span class="jq-checkbox" :class="{ checked: Ch2__3_1 }"></span> Кабельная линия 0,4кВ</label></p>
                            <p v-show="VoltageClass == 2"><label><input type="checkbox" name="Ch2__3_2" v-model="Ch2__3_2"><span class="jq-checkbox" :class="{ checked: Ch2__3_2 }"></span> Кабельная линия 6-10кВ</label></p>
                            <p v-show="VoltageClass == 1"><label><input type="checkbox" name="Ch2__3_1_1" v-model="Ch2__3_1_1"><span class="jq-checkbox" :class="{ checked: Ch2__3_1_1 }"></span> Кабельная линия 0,4кВ с приминением ГНБ*</label></p>
                            <p v-show="VoltageClass == 2"><label><input type="checkbox" name="Ch2__3_2_1" v-model="Ch2__3_2_1"><span class="jq-checkbox" :class="{ checked: Ch2__3_2_1 }"></span> Кабельная линия 6(10)кВ с приминением ГНБ*</label></p>
                        </div>
                    </div>
                </div>
                <div class="source">
                    <p class="in_2 check">
                        <label>
                            <input type="checkbox" value="check" v-model="BuildTP">
                            <span class="jq-checkbox" :class="{ checked: BuildTP }"></span> Строительство ТП
                        </label>
                    </p>
                    <div class="inner_wrap">
                        <div class="left">
                            <p><label><input type="radio" name="BuildTP" value="C4_1" :disabled="!BuildTP"> Строительство ТП-6(10) кВ 25 кВА</label></p>
                            <p><label><input type="radio" name="BuildTP" value="C4_2" :disabled="!BuildTP"> Строительство ТП-6(10) кВ 40 кВА</label></p>
                            <p><label><input type="radio" name="BuildTP" value="C4_3" :disabled="!BuildTP"> Строительство ТП-6(10) кВ 63 кВА</label></p>
                            <p><label><input type="radio" name="BuildTP" value="C4_4" :disabled="!BuildTP"> Строительство ТП-6(10) кВ 100 кВА</label></p>
                            <p><label><input type="radio" name="BuildTP" value="C4_5" :disabled="!BuildTP"> Строительство ТП-6(10) кВ 160 кВА</label></p>
                            <p><label><input type="radio" name="BuildTP" value="C4_6" :disabled="!BuildTP"> Строительство ТП-6(10) кВ 250 кВА</label></p>
                            <p><label><input type="radio" name="BuildTP" value="C4_7" :disabled="!BuildTP"> Строительство ТП-6(10) кВ 400 кВА</label></p>
                        </div>
                        <div class="right">
                            <p><label><input type="radio" name="BuildTP" value="C4_8" :disabled="!BuildTP"> Строительство ТП-6(10) кВ 630 кВА</label></p>
                            <p><label><input type="radio" name="BuildTP" value="C4_9" :disabled="!BuildTP"> Строительство ТП-6(10) кВ 2x160 кВА</label></p>
                            <p><label><input type="radio" name="BuildTP" value="C4_10" :disabled="!BuildTP"> Строительство ТП-6(10) кВ 2x250 кВА</label></p>
                            <p><label><input type="radio" name="BuildTP" value="C4_11" :disabled="!BuildTP"> Строительство ТП-6(10) кВ 2x400 кВА</label></p>
                            <p><label><input type="radio" name="BuildTP" value="C4_12" :disabled="!BuildTP"> Строительство ТП-6(10) кВ 2x630 кВА</label></p>
                            <p><label><input type="radio" name="BuildTP" value="C4_13" :disabled="!BuildTP"> Строительство ТП-6(10) кВ 2x1000 кВА</label></p>
                            <p><label><input type="radio" name="BuildTP" value="C4_14" :disabled="!BuildTP"> Строительство ТП-6(10) кВ 2x1250 кВА</label></p>
                        </div>
                    </div>
                </div>
                <p class="sourse_bottom"><b>*ГНБ -</b> Горизонтальное бурение или Горизонтальное направленное бурение — управляемый бестраншейный <br>
                    метод прокладывания подземных коммуникаций, основанный на использовании специальных буровых <br>
                    комплексов.</p>
            </div>
        </div>

        <!-- по стандартизированной ставке -->
        <div id="forth_2" v-show="Conditions && VoltageClass !==0 && Build && Calculate == 2 || S1 == 1 && N>15 && VoltageClass !==0 && Build && Calculate == 2">
                <p class="options">Параметры для расчета стоимости по стандартизированной ставке</p>
            <div class="index">
                <p>Индекс изменения сметной стоимости за:</p>
                <div class="sqrt">3</div>
                <p class="quart">квартал</p>
            </div>
            <div class="source">
                <div class="select">
                    <select class="no_styled">
                        <option value="0" disabled selected> Выберите тип линии </option>
                        <option value="1">Воздушная линия 0,4кВ</option>
                        <option value="2">Воздушная линия изолированная 0,4кВ</option>
                        <option value="3">Воздушная линия 6-10кВ</option>
                        <option value="4">Воздушная линия изолированная 6-10кВ</option>
                        <option value="5">Кабельная линия 0,4кВ</option>
                        <option value="6">Кабельная линия 6-10кВ</option>
                        <option value="7">Кабельная линия 0,4кВ с приминением ГНБ*</option>
                    </select>
                </div>
                <div class="long">
                    <div class="left_text"><input type="text" placeholder="длина"> <span>км</span></div>
                    <div class="index">
                        <p>Индекс</p>
                        <div class="sqrt">4.95</div>
                    </div>
                </div>
            </div>
            <div class="btn"><a href="#">Добавить линию</a></div>
            <div class="source">
                <div class="select">
                    <select class="no_styled">
                        <option value="0" disabled selected> Выберите тип линии </option>
                        <option value="1">Воздушная линия 0,4кВ</option>
                        <option value="2">Воздушная линия изолированная 0,4кВ</option>
                        <option value="3">Воздушная линия 6-10кВ</option>
                        <option value="4">Воздушная линия изолированная 6-10кВ</option>
                        <option value="5">Кабельная линия 0,4кВ</option>
                        <option value="6">Кабельная линия 6-10кВ</option>
                        <option value="7">Кабельная линия 0,4кВ с приминением ГНБ*</option>
                    </select>
                </div>
                <div class="long">
                    <div class="left_text"><input type="text" placeholder="длина"> <span>км</span></div>
                    <div class="index">
                        <p>Индекс</p>
                        <div class="sqrt">4.95</div>
                    </div>
                </div>
            </div>


            <p class="sourse_bottom"><b>*ГНБ -</b> Горизонтальное бурение или Горизонтальное направленное бурение — управляемый бестраншейный <br>
                    метод прокладывания подземных коммуникаций, основанный на использовании специальных буровых <br>
                    комплексов.</p>
        </div>

        <div class="block" v-show="Conditions && VoltageClass !==0  && Build && Calculate == 2 || S1 == 1 && N>15 && VoltageClass !==0 && Build && Calculate == 2">
            <div class="source">
                <p class="in_2 check">
                    <label>
                        <input type="checkbox" value="check" v-model="BuildTP">
                        <span class="jq-checkbox" :class="{ checked: BuildTP }"></span> Строительство ТП {{BuildTP_radio}}
                    </label>
                </p>
                <div class="inner_wrap">
                    <div class="left">
                        <p><label><input type="radio" name="BuildTP_radio" value="25"  :disabled="!BuildTP"> Строительство ТП-6(10) кВ 25 кВА</label></p>
                        <p><label><input type="radio" name="BuildTP_radio" value="40"  :disabled="!BuildTP"> Строительство ТП-6(10) кВ 40 кВА</label></p>
                        <p><label><input type="radio" name="BuildTP_radio" value="63"  :disabled="!BuildTP"> Строительство ТП-6(10) кВ 63 кВА</label></p>
                        <p><label><input type="radio" name="BuildTP_radio" value="100" :disabled="!BuildTP"> Строительство ТП-6(10) кВ 100 кВА</label></p>
                        <p><label><input type="radio" name="BuildTP_radio" value="160" :disabled="!BuildTP"> Строительство ТП-6(10) кВ 160 кВА</label></p>
                        <p><label><input type="radio" name="BuildTP_radio" value="250" :disabled="!BuildTP"> Строительство ТП-6(10) кВ 250 кВА</label></p>
                        <p><label><input type="radio" name="BuildTP_radio" value="400" :disabled="!BuildTP"> Строительство ТП-6(10) кВ 400 кВА</label></p>
                    </div>
                    <div class="right">
                        <p><label><input type="radio" name="BuildTP_radio" value="630"   :disabled="!BuildTP"> Строительство ТП-6(10) кВ 630 кВА</label></p>
                        <p><label><input type="radio" name="BuildTP_radio" value="2160"  :disabled="!BuildTP"> Строительство ТП-6(10) кВ 2x160 кВА</label></p>
                        <p><label><input type="radio" name="BuildTP_radio" value="2250"  :disabled="!BuildTP"> Строительство ТП-6(10) кВ 2x250 кВА</label></p>
                        <p><label><input type="radio" name="BuildTP_radio" value="2400"  :disabled="!BuildTP"> Строительство ТП-6(10) кВ 2x400 кВА</label></p>
                        <p><label><input type="radio" name="BuildTP_radio" value="2630"  :disabled="!BuildTP"> Строительство ТП-6(10) кВ 2x630 кВА</label></p>
                        <p><label><input type="radio" name="BuildTP_radio" value="21000" :disabled="!BuildTP"> Строительство ТП-6(10) кВ 2x1000 кВА</label></p>
                        <p><label><input type="radio" name="BuildTP_radio" value="21250" :disabled="!BuildTP"> Строительство ТП-6(10) кВ 2x1250 кВА</label></p>
                    </div>
                </div>
            </div>
        </div>
        <!-- Расчет -->
        <div id="fifth">
            <div class="result">
                <p>Результаты:</p>
                <div class="total">
                    <div class="wr_score">
                        <p>Итог по ставке за максимальную мощность (руб./кВт)</p>
                        <p class="score">{{resultPw}} руб.</p>
                    </div>
                    <div class="wr_score">
                        <p>Итог по стандартизированной ставке (руб./км)</p>
                        <p class="score">{{resultSt}} руб.</p>
                    </div>
                </div>
            </div>
        </div>

</div>

<script src="https://unpkg.com/vue@2.4.2"></script>
<script src="/about/test/calculate.js"></script>
 
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>