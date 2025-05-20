document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const calculatorContainer = document.querySelector('.calculator-container');
    const display = document.getElementById('display');
    const historyDisplay = document.getElementById('history');
    const memoryIndicator = document.getElementById('memory-indicator');
    
    // Header Controls
    const themeToggleBtn = document.getElementById('theme-toggle');
    const settingsBtn = document.getElementById('settings-btn');
    const historyToggleBtn = document.getElementById('history-toggle');
    
    // Mode Switcher
    const modeTabs = document.querySelectorAll('.mode-tab');
    const sliderIndicator = document.querySelector('.slider-indicator');
    const mainPanels = document.querySelectorAll('.main-panel');
    
    // Calculator Panel
    const calculatorPanel = document.querySelector('.calculator-panel');
    const calcSubModeBtns = calculatorPanel.querySelectorAll('.sub-mode-btn');
    const standardKeypad = calculatorPanel.querySelector('.standard-mode');
    const scientificKeypad = calculatorPanel.querySelector('.scientific-mode');
    const programmerKeypad = calculatorPanel.querySelector('.programmer-mode');
    const allKeypadBtns = calculatorPanel.querySelectorAll('.keypad-btn');
    const memoryBtns = calculatorPanel.querySelectorAll('.memory-btn');
    
    // Financial Panel
    const financialPanel = document.querySelector('.financial-panel');
    const financialSubModeBtns = financialPanel.querySelectorAll('.sub-mode-btn');
    const financialContentTabs = financialPanel.querySelectorAll('.financial-content');
    
    // TVM Calculator
    const pvInput = document.getElementById('pv');
    const fvInput = document.getElementById('fv');
    const pmtInput = document.getElementById('pmt');
    const rateInput = document.getElementById('rate');
    const periodsInput = document.getElementById('periods');
    const paymentTypeSelect = document.getElementById('payment-type');
    const calculateTvmBtn = document.getElementById('calculate-tvm');
    const tvmResultDisplay = document.getElementById('tvm-result');
    
    // Loan Calculator
    const loanAmountInput = document.getElementById('loan-amount');
    const loanRateInput = document.getElementById('loan-rate');
    const loanTermInput = document.getElementById('loan-term');
    const loanPaymentsSelect = document.getElementById('loan-payments');
    const calculateLoanBtn = document.getElementById('calculate-loan');
    const loanEmiResult = document.getElementById('loan-emi-result');
    const loanTotalPayableResult = document.getElementById('loan-total-payable-result');
    const loanTotalInterestResult = document.getElementById('loan-total-interest-result');
    const showAmortizationBtn = document.getElementById('show-amortization');
    
    // Investment Calculator
    const invInitialInput = document.getElementById('inv-initial');
    const invContributionInput = document.getElementById('inv-contribution');
    const invRateInput = document.getElementById('inv-rate');
    const invYearsInput = document.getElementById('inv-years');
    const invCompoundingSelect = document.getElementById('inv-compounding');
    const calculateInvestmentBtn = document.getElementById('calculate-investment');
    const invResultDisplay = document.getElementById('inv-result');
    const invContributionsResult = document.getElementById('inv-contributions-result');
    const invInterestResult = document.getElementById('inv-interest-result');
    const showGrowthChartBtn = document.getElementById('show-growth-chart');
    
    // Currency Converter
    const currencyAmountInput = document.getElementById('currency-amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const currencyDateInput = document.getElementById('currency-date');
    const convertCurrencyBtn = document.getElementById('convert-currency');
    const currencyResultDisplay = document.getElementById('currency-result');
    const currencyRateDisplay = document.getElementById('currency-rate');
    
    // Unit Converter
    const converterPanel = document.querySelector('.converter-panel');
    const categorySelect = document.getElementById('converter-category');
    const fromUnitSelect = document.getElementById('from-unit');
    const toUnitSelect = document.getElementById('to-unit');
    const converterValueFromInput = document.getElementById('converter-value-from');
    const converterValueToInput = document.getElementById('converter-value-to');
    const conversionFormulaDisplay = document.getElementById('conversion-formula');
    const swapUnitsBtn = document.getElementById('swap-units');
    const conversionHistoryList = document.getElementById('conversion-history-list');
    
    // Settings Panel
    const settingsOverlay = document.getElementById('settings-overlay');
    const closeSettingsBtn = document.getElementById('close-settings');
    const saveSettingsBtn = document.getElementById('save-settings');
    const decimalPlacesSelect = document.getElementById('decimal-places');
    const thousandsSeparatorSelect = document.getElementById('thousands-separator');
    const angleUnitSelect = document.getElementById('angle-unit');
    const sciNotationSelect = document.getElementById('sci-notation');
    const currencyPrefSelect = document.getElementById('currency-pref');
    const taxRateInput = document.getElementById('tax-rate');
    const hapticFeedbackToggle = document.getElementById('haptic-feedback');
    const buttonSoundsToggle = document.getElementById('button-sounds');
    
    // Modals
    const amortizationModal = document.getElementById('amortization-modal');
    const closeAmortizationBtn = document.getElementById('close-amortization');
    const amortizationTable = document.getElementById('amortization-table').querySelector('tbody');
    const exportAmortizationBtn = document.getElementById('export-amortization');
    const growthModal = document.getElementById('growth-modal');
    const closeGrowthBtn = document.getElementById('close-growth');
    const growthChartCanvas = document.getElementById('growth-chart');
    const exportGrowthBtn = document.getElementById('export-growth');
    
    // --- State Variables ---
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let resetScreen = false;
    let memoryValue = 0;
    let currentCalculatorMode = 'standard'; // 'standard', 'scientific', 'programmer'
    let currentAngleUnit = 'deg'; // 'deg', 'rad', 'grad'
    let currentDecimalPlaces = '4'; // '0', '2', '4', '6', '8', 'auto'
    let currentThousandsSeparator = ','; // ',', '.', ' ', 'none'
    let currentSciNotation = 'auto'; // 'auto', 'always', 'never'
    let historyArr = [];
    let conversionHistory = [];
    let converterData = {};
    let exchangeRates = {};
    let amortizationSchedule = [];
    let growthData = [];
    let currentBaseCurrency = 'USD';
    
    // --- Initialization ---
    function init() {
        loadSettings();
        setupEventListeners();
        setupConverter();
        setupCurrencyConverter();
        updateDisplay();
        updateMemoryIndicator();
        updateSliderIndicator(document.querySelector('.mode-tab.active'));
        
        // Set default date for currency converter
        currencyDateInput.valueAsDate = new Date();
        
        // Activate default panels
        switchMainPanel('calculator', document.querySelector('.mode-tab[data-mode="calculator"]'));
        switchCalculatorSubMode('standard', calculatorPanel.querySelector('.sub-mode-btn[data-sub-mode="standard"]'));
        switchFinancialSubMode('tvm', financialPanel.querySelector('.sub-mode-btn[data-sub-mode="tvm"]'));
    }
    
    // --- Event Listeners Setup ---
    function setupEventListeners() {
        // Theme Toggle
        themeToggleBtn.addEventListener('click', toggleTheme);
        
        // Settings Modal
        settingsBtn.addEventListener('click', () => settingsOverlay.classList.add('active'));
        closeSettingsBtn.addEventListener('click', () => settingsOverlay.classList.remove('active'));
        settingsOverlay.addEventListener('click', (e) => {
            if (e.target === settingsOverlay) settingsOverlay.classList.remove('active');
        });
        saveSettingsBtn.addEventListener('click', saveAndApplySettings);
        
        // Mode Switcher
        modeTabs.forEach(tab => {
            tab.addEventListener('click', () => switchMainPanel(tab.dataset.mode, tab));
        });
        
        // Calculator Panel
        calcSubModeBtns.forEach(btn => {
            btn.addEventListener('click', () => switchCalculatorSubMode(btn.dataset.subMode, btn));
        });
        
        // Keypad buttons
        allKeypadBtns.forEach(button => {
            button.addEventListener('click', () => handleKeypadInput(button.dataset.value, button));
        });
        
        // Memory buttons
        memoryBtns.forEach(button => {
            button.addEventListener('click', () => handleMemoryFunction(button.dataset.value));
        });
        
        // Financial Panel
        financialSubModeBtns.forEach(btn => {
            btn.addEventListener('click', () => switchFinancialSubMode(btn.dataset.subMode, btn));
        });
        
        // TVM Calculator
        [pvInput, fvInput, pmtInput, rateInput, periodsInput].forEach(el => {
            el?.addEventListener('input', calculateTVM);
        });
        calculateTvmBtn?.addEventListener('click', calculateTVM);
        
        // Loan Calculator
        [loanAmountInput, loanRateInput, loanTermInput].forEach(el => {
            el?.addEventListener('input', calculateLoan);
        });
        calculateLoanBtn?.addEventListener('click', calculateLoan);
        showAmortizationBtn?.addEventListener('click', showAmortizationSchedule);
        
        // Investment Calculator
        [invInitialInput, invContributionInput, invRateInput, invYearsInput].forEach(el => {
            el?.addEventListener('input', calculateInvestment);
        });
        calculateInvestmentBtn?.addEventListener('click', calculateInvestment);
        showGrowthChartBtn?.addEventListener('click', showInvestmentGrowthChart);
        
        // Currency Converter
        convertCurrencyBtn?.addEventListener('click', convertCurrency);
        swapUnitsBtn?.addEventListener('click', swapCurrencies);
        
        // Unit Converter
        categorySelect?.addEventListener('change', () => {
            populateUnitSelectors(categorySelect.value);
            performConversion();
        });
        fromUnitSelect?.addEventListener('change', performConversion);
        toUnitSelect?.addEventListener('change', performConversion);
        converterValueFromInput?.addEventListener('input', performConversion);
        swapUnitsBtn?.addEventListener('click', swapUnits);
        
        // Modals
        closeAmortizationBtn?.addEventListener('click', () => amortizationModal.classList.remove('active'));
        closeGrowthBtn?.addEventListener('click', () => growthModal.classList.remove('active'));
        exportAmortizationBtn?.addEventListener('click', exportAmortizationToCSV);
        exportGrowthBtn?.addEventListener('click', exportGrowthChart);
        
        // Keyboard Support
        document.addEventListener('keydown', handleKeyboardInput);
        
        // History Toggle
        historyToggleBtn?.addEventListener('click', toggleHistoryDisplay);
    }
    
    // --- UI Update Functions ---
    function updateDisplay() {
        display.textContent = formatNumberForDisplay(currentInput);
        display.scrollLeft = display.scrollWidth;
    }
    
    function updateHistoryDisplay(entry = null) {
        if (entry) {
            historyArr.push(entry);
            if (historyArr.length > 10) historyArr.shift();
        }
        historyDisplay.innerHTML = historyArr.join('<br>');
        historyDisplay.scrollTop = historyDisplay.scrollHeight;
    }
    
    function toggleHistoryDisplay() {
        historyDisplay.classList.toggle('visible');
        calculatorContainer.classList.toggle('history-visible');
    }
    
    function updateSliderIndicator(activeTab) {
        if (!activeTab || !sliderIndicator) return;
        const tabWidth = activeTab.offsetWidth;
        const tabLeft = activeTab.offsetLeft;
        sliderIndicator.style.width = `${tabWidth}px`;
        sliderIndicator.style.left = `${tabLeft}px`;
    }
    
    function switchMainPanel(mode, clickedTab) {
        modeTabs.forEach(tab => tab.classList.remove('active'));
        clickedTab.classList.add('active');
        updateSliderIndicator(clickedTab);
        
        const activePanel = document.querySelector('.main-panel.active');
        if (activePanel && activePanel.dataset.panel !== mode) {
            activePanel.classList.add('fade-out');
            setTimeout(() => {
                activePanel.classList.remove('active', 'fade-out');
                const newPanel = document.querySelector(`.main-panel[data-panel="${mode}"]`);
                if (newPanel) {
                    newPanel.classList.add('active');
                }
            }, 300);
        } else if (!activePanel) {
            const newPanel = document.querySelector(`.main-panel[data-panel="${mode}"]`);
            if (newPanel) {
                newPanel.classList.add('active');
            }
        }
    }
    
    function switchCalculatorSubMode(subMode, clickedBtn) {
        currentCalculatorMode = subMode;
        calcSubModeBtns.forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');
        
        standardKeypad.classList.remove('active');
        scientificKeypad.classList.remove('active');
        programmerKeypad.classList.remove('active');
        
        if (subMode === 'standard') {
            standardKeypad.classList.add('active');
        } else if (subMode === 'scientific') {
            scientificKeypad.classList.add('active');
        } else if (subMode === 'programmer') {
            programmerKeypad.classList.add('active');
        }
    }
    
    function switchFinancialSubMode(subMode, clickedBtn) {
        financialSubModeBtns.forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');
        
        financialContentTabs.forEach(tab => {
            if (tab.classList.contains(`${subMode}-tab`)) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }
    
    function updateMemoryIndicator() {
        memoryIndicator.classList.toggle('active', memoryValue !== 0);
        memoryIndicator.title = `Memory: ${formatNumberForDisplay(memoryValue)}`;
    }
    
    // --- Theme Management ---
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('calculatorTheme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('calculatorTheme', 'dark');
        }
    }
    
    // --- Settings Management ---
    function loadSettings() {
        // Theme
        const savedTheme = localStorage.getItem('calculatorTheme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        // Calculator settings
        currentAngleUnit = localStorage.getItem('calculatorAngleUnit') || 'deg';
        angleUnitSelect.value = currentAngleUnit;
        
        currentDecimalPlaces = localStorage.getItem('calculatorDecimalPlaces') || '4';
        decimalPlacesSelect.value = currentDecimalPlaces;
        
        currentThousandsSeparator = localStorage.getItem('calculatorThousandsSeparator') || ',';
        thousandsSeparatorSelect.value = currentThousandsSeparator;
        
        currentSciNotation = localStorage.getItem('calculatorSciNotation') || 'auto';
        sciNotationSelect.value = currentSciNotation;
        
        // Financial settings
        currentBaseCurrency = localStorage.getItem('calculatorBaseCurrency') || 'USD';
        currencyPrefSelect.value = currentBaseCurrency;
        
        const savedTaxRate = localStorage.getItem('calculatorTaxRate');
        if (savedTaxRate) {
            taxRateInput.value = savedTaxRate;
        }
        
        // Other settings
        const savedHaptic = localStorage.getItem('calculatorHapticFeedback');
        hapticFeedbackToggle.checked = savedHaptic !== 'false';
        
        const savedSounds = localStorage.getItem('calculatorButtonSounds');
        buttonSoundsToggle.checked = savedSounds === 'true';
        
        // History
        const savedHistory = localStorage.getItem('calculatorHistory');
        if (savedHistory) {
            historyArr = JSON.parse(savedHistory);
            updateHistoryDisplay();
        }
        
        const savedConvHistory = localStorage.getItem('conversionHistory');
        if (savedConvHistory) {
            conversionHistory = JSON.parse(savedConvHistory);
            updateConversionHistoryDisplay();
        }
    }
    
    function saveAndApplySettings() {
        // Theme is saved directly by toggleTheme
        
        // Calculator settings
        currentAngleUnit = angleUnitSelect.value;
        localStorage.setItem('calculatorAngleUnit', currentAngleUnit);
        
        currentDecimalPlaces = decimalPlacesSelect.value;
        localStorage.setItem('calculatorDecimalPlaces', currentDecimalPlaces);
        
        currentThousandsSeparator = thousandsSeparatorSelect.value;
        localStorage.setItem('calculatorThousandsSeparator', currentThousandsSeparator);
        
        currentSciNotation = sciNotationSelect.value;
        localStorage.setItem('calculatorSciNotation', currentSciNotation);
        
        // Financial settings
        currentBaseCurrency = currencyPrefSelect.value;
        localStorage.setItem('calculatorBaseCurrency', currentBaseCurrency);
        
        localStorage.setItem('calculatorTaxRate', taxRateInput.value);
        
        // Other settings
        localStorage.setItem('calculatorHapticFeedback', hapticFeedbackToggle.checked);
        localStorage.setItem('calculatorButtonSounds', buttonSoundsToggle.checked);
        
        // History
        localStorage.setItem('calculatorHistory', JSON.stringify(historyArr));
        localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
        
        settingsOverlay.classList.remove('active');
        updateDisplay();
    }
    
    // --- Formatting Helpers ---
    function formatNumberForDisplay(numStr) {
        if (typeof numStr !== 'string') numStr = String(numStr);
        if (numStr.toLowerCase() === 'error' || numStr.toLowerCase() === 'infinity') return numStr;
        
        // Handle scientific notation
        if (numStr.includes('e')) {
            if (currentSciNotation === 'never') {
                // Convert from scientific to regular notation
                const [coefficient, exponent] = numStr.split('e');
                const exp = parseInt(exponent);
                if (isNaN(exp)) return numStr;
                
                const decimalPlaces = coefficient.split('.')[1]?.length || 0;
                const adjustedExp = exp - decimalPlaces;
                numStr = parseFloat(numStr).toFixed(Math.abs(adjustedExp));
            } else if (currentSciNotation === 'always') {
                // Ensure scientific notation
                const num = parseFloat(numStr);
                if (!isNaN(num)) {
                    return num.toExponential();
                }
            }
            // 'auto' - keep as is
        }
        
        let [integerPart, decimalPart] = numStr.split('.');
        
        // Thousands separator
        if (currentThousandsSeparator !== 'none' && integerPart) {
            const separator = currentThousandsSeparator === ' ' ? ' ' : currentThousandsSeparator;
            integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        }
        
        let result = integerPart;
        if (decimalPart !== undefined) {
            result += '.' + decimalPart;
        }
        return result;
    }
    
    function formatNumberForCalculation(numStr) {
        if (typeof numStr !== 'string') numStr = String(numStr);
        // Remove thousands separators for calculation
        const separator = currentThousandsSeparator === ' ' ? ' ' : currentThousandsSeparator;
        if (separator !== 'none') {
            const regex = new RegExp(separator.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
            numStr = numStr.replace(regex, '');
        }
        return numStr;
    }
    
    function roundToSpecifiedDecimals(num) {
        if (currentDecimalPlaces === 'auto' || isNaN(parseFloat(currentDecimalPlaces))) {
            // Attempt to preserve precision or use a sensible default
            const numStr = String(num);
            if (numStr.includes('e')) return num; // Scientific notation, don't touch
            const maxDecimals = 10; // Max precision for "auto"
            return parseFloat(Number(num).toPrecision(15)); // Try toPrecision for significant figures
        }
        const factor = Math.pow(10, parseInt(currentDecimalPlaces));
        return Math.round(num * factor) / factor;
    }
    
    // --- Calculator Core Logic ---
    function handleKeypadInput(value, button) {
        if (button.classList.contains('number-btn')) {
            appendNumber(value);
        } else if (button.classList.contains('operation-btn')) {
            setOperation(value);
        } else if (button.classList.contains('equals-btn')) {
            calculate();
        } else if (button.classList.contains('function-btn')) {
            handleFunction(value);
        } else if (button.classList.contains('sci-btn')) {
            handleScientificFunction(value);
        }
        
        // Haptic feedback
        if (hapticFeedbackToggle.checked && 'vibrate' in navigator) {
            navigator.vibrate(10);
        }
    }
    
    function appendNumber(number) {
        if (currentInput === 'Error') currentInput = '0';
        if (resetScreen) {
            currentInput = '';
            resetScreen = false;
        }
        // Prevent multiple decimals
        if (number === '.' && currentInput.includes('.')) return;
        if (currentInput === '0' && number !== '.') {
            currentInput = number;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }
    
    function setOperation(op) {
        if (currentInput === 'Error') return;
        if (operation !== null && !resetScreen) {
            calculate();
        }
        previousInput = formatNumberForCalculation(currentInput);
        operation = op;
        resetScreen = true;
        updateHistoryDisplay(`${formatNumberForDisplay(previousInput)} ${op}`);
    }
    
    function calculate() {
        if (operation === null || previousInput === '' || resetScreen) return;
        if (currentInput === 'Error') return;
        
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(formatNumberForCalculation(currentInput));
        
        if (isNaN(prev) || isNaN(current)) {
            currentInput = 'Error';
            updateDisplay();
            return;
        }
        
        let historyEntry = `${formatNumberForDisplay(previousInput)} ${operation} ${formatNumberForDisplay(currentInput)} = `;
        
        switch (operation) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '*': result = prev * current; break;
            case '/':
                if (current === 0) {
                    currentInput = 'Error';
                    updateDisplay();
                    operation = null;
                    previousInput = '';
                    updateHistoryDisplay(historyEntry + "Error");
                    return;
                }
                result = prev / current; break;
            case '^': result = Math.pow(prev, current); break;
            default: return;
        }
        
        result = roundToSpecifiedDecimals(result);
        currentInput = String(result);
        historyEntry += formatNumberForDisplay(currentInput);
        updateHistoryDisplay(historyEntry);
        operation = null;
        previousInput = '';
        resetScreen = true;
        updateDisplay();
    }
    
    function handleFunction(func) {
        if (currentInput === 'Error' && func !== 'AC') return;
        let currentVal = parseFloat(formatNumberForCalculation(currentInput));
        let historyOp = func;
        let historyVal = currentInput;
        
        switch (func) {
            case 'AC': // All Clear
                currentInput = '0';
                previousInput = '';
                operation = null;
                resetScreen = false;
                historyArr = [];
                updateHistoryDisplay("Cleared");
                break;
            case '±': // Toggle Sign
                if (currentInput !== '0') {
                    currentInput = String(currentVal * -1);
                }
                break;
            case '%': // Percentage
                if (operation && previousInput) {
                    const prev = parseFloat(previousInput);
                    currentInput = String(roundToSpecifiedDecimals((prev * currentVal) / 100));
                } else {
                    currentInput = String(roundToSpecifiedDecimals(currentVal / 100));
                }
                historyOp = '%';
                break;
            case '(':
            case ')':
                appendNumber(func);
                return;
            default: return;
        }
        
        if (func !== 'AC') {
            updateHistoryDisplay(`${historyOp}(${formatNumberForDisplay(historyVal)}) = ${formatNumberForDisplay(currentInput)}`);
        }
        updateDisplay();
    }
    
    function handleScientificFunction(func) {
        if (currentInput === 'Error') return;
        let currentVal = parseFloat(formatNumberForCalculation(currentInput));
        let result;
        let historyEntry = `${func}(${formatNumberForDisplay(currentInput)}) = `;
        
        switch (func) {
            case 'sin': result = Math.sin(convertToRadiansIfNeeded(currentVal)); break;
            case 'cos': result = Math.cos(convertToRadiansIfNeeded(currentVal)); break;
            case 'tan': result = Math.tan(convertToRadiansIfNeeded(currentVal)); break;
            case 'asin': result = convertFromRadiansIfNeeded(Math.asin(currentVal)); break;
            case 'acos': result = convertFromRadiansIfNeeded(Math.acos(currentVal)); break;
            case 'atan': result = convertFromRadiansIfNeeded(Math.atan(currentVal)); break;
            case 'log': result = Math.log10(currentVal); break;
            case 'ln': result = Math.log(currentVal); break;
            case '√': result = Math.sqrt(currentVal); break;
            case 'x²': result = Math.pow(currentVal, 2); break;
            case 'x³': result = Math.pow(currentVal, 3); break;
            case '10^x': result = Math.pow(10, currentVal); break;
            case 'e^x': result = Math.exp(currentVal); break;
            case 'π': currentInput = String(Math.PI); updateDisplay(); resetScreen = true; return;
            case 'e': currentInput = String(Math.E); updateDisplay(); resetScreen = true; return;
            case '!': result = factorial(currentVal); break;
            case '^': setOperation('^'); return;
            case 'DEG': currentAngleUnit = 'deg'; angleUnitSelect.value = 'deg'; return;
            case 'RAD': currentAngleUnit = 'rad'; angleUnitSelect.value = 'rad'; return;
            case 'GRAD': currentAngleUnit = 'grad'; angleUnitSelect.value = 'grad'; return;
            case 'rand': currentInput = String(Math.random()); updateDisplay(); resetScreen = true; return;
            default: return;
        }
        
        result = roundToSpecifiedDecimals(result);
        currentInput = String(result);
        historyEntry += formatNumberForDisplay(currentInput);
        updateHistoryDisplay(historyEntry);
        updateDisplay();
        resetScreen = true;
    }
    
    function handleMemoryFunction(memFunc) {
        let currentValue = parseFloat(formatNumberForCalculation(currentInput));
        
        switch (memFunc) {
            case 'MC': memoryValue = 0; break;
            case 'MR': currentInput = String(memoryValue); break;
            case 'M+': memoryValue += currentValue; break;
            case 'M-': memoryValue -= currentValue; break;
            case 'MS': memoryValue = currentValue; break;
            default: return;
        }
        
        updateMemoryIndicator();
        updateDisplay();
    }
    
    // --- Financial Functions ---
    function calculateTVM() {
        const PV = parseFloat(pvInput.value) || 0;
        const FV = parseFloat(fvInput.value) || 0;
        const PMT = parseFloat(pmtInput.value) || 0;
        const RATE = parseFloat(rateInput.value) / 100 || 0;
        const NPER = parseFloat(periodsInput.value) || 0;
        const paymentType = paymentTypeSelect.value === 'beginning' ? 1 : 0;
        
        // Count how many fields are empty to determine what to calculate
        const emptyFields = [
            pvInput.value === '',
            fvInput.value === '',
            pmtInput.value === '',
            rateInput.value === '',
            periodsInput.value === ''
        ].filter(Boolean).length;
        
        if (emptyFields !== 1) {
            tvmResultDisplay.textContent = 'Please leave exactly one field empty to calculate';
            return;
        }
        
        let result = 0;
        let resultType = '';
        
        if (pvInput.value === '') {
            result = PV_CALC(RATE, NPER, PMT, FV, paymentType);
            resultType = 'Present Value (PV)';
        } else if (fvInput.value === '') {
            result = FV_CALC(RATE, NPER, PMT, PV, paymentType);
            resultType = 'Future Value (FV)';
        } else if (pmtInput.value === '') {
            result = PMT_CALC(RATE, NPER, PV, FV, paymentType);
            resultType = 'Payment (PMT)';
        } else if (rateInput.value === '') {
            result = RATE_CALC(NPER, PMT, PV, FV, paymentType) * 100;
            resultType = 'Interest Rate (%)';
        } else if (periodsInput.value === '') {
            result = NPER_CALC(RATE, PMT, PV, FV, paymentType);
            resultType = 'Number of Periods';
        }
        
        tvmResultDisplay.textContent = `${resultType}: ${formatNumberForDisplay(String(roundToSpecifiedDecimals(result)))}`;
    }
    
    function calculateLoan() {
        const loanAmount = parseFloat(loanAmountInput.value) || 0;
        const annualRate = parseFloat(loanRateInput.value) || 0;
        const loanTermYears = parseFloat(loanTermInput.value) || 0;
        const paymentsPerYear = parseInt(loanPaymentsSelect.value) || 12;
        
        if (loanAmount <= 0 || annualRate <= 0 || loanTermYears <= 0) {
            loanEmiResult.textContent = 'Please enter valid values for all fields';
            return;
        }
        
        const periodicRate = annualRate / 100 / paymentsPerYear;
        const totalPayments = loanTermYears * paymentsPerYear;
        
        // Calculate EMI/Payment
        const numerator = loanAmount * periodicRate * Math.pow(1 + periodicRate, totalPayments);
        const denominator = Math.pow(1 + periodicRate, totalPayments) - 1;
        const payment = numerator / denominator;
        
        // Calculate totals
        const totalPayment = payment * totalPayments;
        const totalInterest = totalPayment - loanAmount;
        
        // Update display
        loanEmiResult.textContent = `Periodic Payment: ${formatNumberForDisplay(String(roundToSpecifiedDecimals(payment)))}`;
        loanTotalPayableResult.textContent = `Total Payable: ${formatNumberForDisplay(String(roundToSpecifiedDecimals(totalPayment)))}`;
        loanTotalInterestResult.textContent = `Total Interest: ${formatNumberForDisplay(String(roundToSpecifiedDecimals(totalInterest)))}`;
        
        // Generate amortization schedule
        generateAmortizationSchedule(loanAmount, annualRate, loanTermYears, paymentsPerYear, payment);
    }
    
    function generateAmortizationSchedule(principal, annualRate, years, paymentsPerYear, payment) {
        amortizationSchedule = [];
        let balance = principal;
        const periodicRate = annualRate / 100 / paymentsPerYear;
        const totalPayments = years * paymentsPerYear;
        
        for (let i = 1; i <= totalPayments; i++) {
            const interest = balance * periodicRate;
            const principalPayment = payment - interest;
            balance -= principalPayment;
            
            amortizationSchedule.push({
                period: i,
                payment: payment,
                principal: principalPayment,
                interest: interest,
                balance: balance > 0 ? balance : 0
            });
        }
    }
    
    function showAmortizationSchedule() {
        if (amortizationSchedule.length === 0) {
            alert('Please calculate loan details first');
            return;
        }
        
        // Clear previous table
        amortizationTable.innerHTML = '';
        
        // Add rows (limit to first 12 months for display)
        const displayCount = Math.min(12, amortizationSchedule.length);
        for (let i = 0; i < displayCount; i++) {
            const row = amortizationSchedule[i];
            const tr = document.createElement('tr');
            
            tr.innerHTML = `
                <td>${row.period}</td>
                <td>${formatNumberForDisplay(row.payment.toFixed(2))}</td>
                <td>${formatNumberForDisplay(row.principal.toFixed(2))}</td>
                <td>${formatNumberForDisplay(row.interest.toFixed(2))}</td>
                <td>${formatNumberForDisplay(row.balance.toFixed(2))}</td>
            `;
            
            amortizationTable.appendChild(tr);
        }
        
        // Show modal
        amortizationModal.classList.add('active');
    }
    
    function exportAmortizationToCSV() {
        if (amortizationSchedule.length === 0) return;
        
        let csvContent = "Period,Payment,Principal,Interest,Balance\n";
        
        amortizationSchedule.forEach(row => {
            csvContent += `${row.period},${row.payment.toFixed(2)},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.balance.toFixed(2)}\n`;
        });
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'amortization_schedule.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    function calculateInvestment() {
        const initialInvestment = parseFloat(invInitialInput.value) || 0;
        const periodicContribution = parseFloat(invContributionInput.value) || 0;
        const annualRate = parseFloat(invRateInput.value) || 0;
        const years = parseFloat(invYearsInput.value) || 0;
        const compoundingPerYear = parseInt(invCompoundingSelect.value) || 12;
        
        if (initialInvestment <= 0 || annualRate <= 0 || years <= 0) {
            invResultDisplay.textContent = 'Please enter valid values for required fields';
            return;
        }
        
        const periodicRate = annualRate / 100 / compoundingPerYear;
        const totalPeriods = years * compoundingPerYear;
        
        // Calculate future value
        const futureValue = initialInvestment * Math.pow(1 + periodicRate, totalPeriods) + 
                           periodicContribution * (Math.pow(1 + periodicRate, totalPeriods) - 1) / periodicRate;
        
        // Calculate totals
        const totalContributions = initialInvestment + periodicContribution * totalPeriods;
        const interestEarned = futureValue - totalContributions;
        
        // Update display
        invResultDisplay.textContent = `Future Value: ${formatNumberForDisplay(String(roundToSpecifiedDecimals(futureValue)))}`;
        invContributionsResult.textContent = `Total Contributions: ${formatNumberForDisplay(String(roundToSpecifiedDecimals(totalContributions)))}`;
        invInterestResult.textContent = `Interest Earned: ${formatNumberForDisplay(String(roundToSpecifiedDecimals(interestEarned)))}`;
        
        // Generate growth data
        generateGrowthData(initialInvestment, periodicContribution, annualRate, years, compoundingPerYear);
    }
    
    function generateGrowthData(initial, contribution, rate, years, compounding) {
        growthData = [];
        let balance = initial;
        const periodicRate = rate / 100 / compounding;
        const periodsPerYear = compounding;
        const totalPeriods = years * periodsPerYear;
        
        for (let i = 0; i <= years; i++) {
            const periods = i * periodsPerYear;
            if (periods > totalPeriods) break;
            
            // Calculate balance at end of each year
            balance = initial * Math.pow(1 + periodicRate, periods) + 
                      contribution * (Math.pow(1 + periodicRate, periods) - 1) / periodicRate;
            
            growthData.push({
                year: i,
                balance: balance
            });
        }
    }
    
    function showInvestmentGrowthChart() {
        if (growthData.length === 0) {
            alert('Please calculate investment first');
            return;
        }
        
        // Create or update chart
        const ctx = growthChartCanvas.getContext('2d');
        
        // Destroy previous chart if exists
        if (growthChartCanvas.chart) {
            growthChartCanvas.chart.destroy();
        }
        
        growthChartCanvas.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: growthData.map(item => item.year),
                datasets: [{
                    label: 'Investment Value',
                    data: growthData.map(item => item.balance),
                    borderColor: '#4A90E2',
                    backgroundColor: 'rgba(74, 144, 226, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Investment Growth Over Time'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Value: ${formatNumberForDisplay(context.raw.toFixed(2))}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Years'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Value'
                        },
                        ticks: {
                            callback: function(value) {
                                return formatNumberForDisplay(value.toFixed(2));
                            }
                        }
                    }
                }
            }
        });
        
        // Show modal
        growthModal.classList.add('active');
    }
    
    function exportGrowthChart() {
        if (!growthChartCanvas.chart) return;
        
        // Create a temporary canvas to ensure high quality export
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = growthChartCanvas.width * 2;
        tempCanvas.height = growthChartCanvas.height * 2;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.fillStyle = getComputedStyle(growthChartCanvas).backgroundColor;
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        tempCtx.drawImage(growthChartCanvas, 0, 0, tempCanvas.width, tempCanvas.height);
        
        // Convert to image and download
        const link = document.createElement('a');
        link.download = 'investment_growth.png';
        link.href = tempCanvas.toDataURL('image/png');
        link.click();
    }
    
    // --- Currency Converter ---
    function setupCurrencyConverter() {
        // In a real app, you would fetch these from an API
        exchangeRates = {
            USD: { EUR: 0.85, GBP: 0.73, JPY: 110.15, CAD: 1.25 },
            EUR: { USD: 1.18, GBP: 0.86, JPY: 129.53, CAD: 1.47 },
            GBP: { USD: 1.37, EUR: 1.16, JPY: 150.27, CAD: 1.70 },
            JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0067, CAD: 0.011 },
            CAD: { USD: 0.80, EUR: 0.68, GBP: 0.59, JPY: 88.03 }
        };
        
        // Set default date to today
        currencyDateInput.valueAsDate = new Date();
    }
    
    function convertCurrency() {
        const amount = parseFloat(currencyAmountInput.value) || 0;
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        const date = currencyDateInput.value;
        
        if (amount <= 0) {
            currencyResultDisplay.textContent = 'Please enter a valid amount';
            return;
        }
        
        if (fromCurrency === toCurrency) {
            currencyResultDisplay.textContent = `${formatNumberForDisplay(amount)} ${fromCurrency} = ${formatNumberForDisplay(amount)} ${toCurrency}`;
            currencyRateDisplay.textContent = `1 ${fromCurrency} = 1 ${toCurrency}`;
            return;
        }
        
        // In a real app, you would fetch the rate for the selected date from an API
        const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1;
        const convertedAmount = amount * rate;
        
        currencyResultDisplay.textContent = `${formatNumberForDisplay(amount)} ${fromCurrency} = ${formatNumberForDisplay(convertedAmount.toFixed(4))} ${toCurrency}`;
        currencyRateDisplay.textContent = `1 ${fromCurrency} = ${rate.toFixed(6)} ${toCurrency} (${date})`;
    }
    
    function swapCurrencies() {
        const temp = fromCurrencySelect.value;
        fromCurrencySelect.value = toCurrencySelect.value;
        toCurrencySelect.value = temp;
        convertCurrency();
    }
    
    // --- Unit Converter ---
    function setupConverter() {
        converterData = {
            "length": {
                "meters": { to_base: 1, name: "Meter" },
                "kilometers": { to_base: 1000, name: "Kilometer" },
                "centimeters": { to_base: 0.01, name: "Centimeter" },
                "millimeters": { to_base: 0.001, name: "Millimeter" },
                "miles": { to_base: 1609.34, name: "Mile" },
                "yards": { to_base: 0.9144, name: "Yard" },
                "feet": { to_base: 0.3048, name: "Foot" },
                "inches": { to_base: 0.0254, name: "Inch" },
                "nautical-miles": { to_base: 1852, name: "Nautical Mile" }
            },
            "weight": {
                "kilograms": { to_base: 1, name: "Kilogram" },
                "grams": { to_base: 0.001, name: "Gram" },
                "milligrams": { to_base: 0.000001, name: "Milligram" },
                "pounds": { to_base: 0.453592, name: "Pound" },
                "ounces": { to_base: 0.0283495, name: "Ounce" },
                "stones": { to_base: 6.35029, name: "Stone" },
                "tons": { to_base: 907.185, name: "Ton (US)" },
                "metric-tons": { to_base: 1000, name: "Metric Ton" }
            },
            "temperature": {
                "celsius": { name: "Celsius" },
                "fahrenheit": { name: "Fahrenheit" },
                "kelvin": { name: "Kelvin" }
            },
            "volume": {
                "liters": { to_base: 1, name: "Liter" },
                "milliliters": { to_base: 0.001, name: "Milliliter" },
                "cubic-meters": { to_base: 1000, name: "Cubic Meter" },
                "cubic-centimeters": { to_base: 0.001, name: "Cubic Centimeter" },
                "cubic-inches": { to_base: 0.0163871, name: "Cubic Inch" },
                "cubic-feet": { to_base: 28.3168, name: "Cubic Foot" },
                "gallons": { to_base: 3.78541, name: "Gallon (US)" },
                "quarts": { to_base: 0.946353, name: "Quart (US)" },
                "pints": { to_base: 0.473176, name: "Pint (US)" },
                "cups": { to_base: 0.236588, name: "Cup (US)" },
                "fluid-ounces": { to_base: 0.0295735, name: "Fluid Ounce (US)" },
                "tablespoons": { to_base: 0.0147868, name: "Tablespoon (US)" },
                "teaspoons": { to_base: 0.00492892, name: "Teaspoon (US)" }
            },
            "area": {
                "square-meters": { to_base: 1, name: "Square Meter" },
                "square-kilometers": { to_base: 1000000, name: "Square Kilometer" },
                "square-centimeters": { to_base: 0.0001, name: "Square Centimeter" },
                "square-millimeters": { to_base: 0.000001, name: "Square Millimeter" },
                "square-miles": { to_base: 2589988.11, name: "Square Mile" },
                "square-yards": { to_base: 0.836127, name: "Square Yard" },
                "square-feet": { to_base: 0.092903, name: "Square Foot" },
                "square-inches": { to_base: 0.00064516, name: "Square Inch" },
                "hectares": { to_base: 10000, name: "Hectare" },
                "acres": { to_base: 4046.86, name: "Acre" }
            },
            "speed": {
                "meters-per-second": { to_base: 1, name: "Meter/Second" },
                "kilometers-per-hour": { to_base: 0.277778, name: "Kilometer/Hour" },
                "miles-per-hour": { to_base: 0.44704, name: "Mile/Hour" },
                "feet-per-second": { to_base: 0.3048, name: "Foot/Second" },
                "knots": { to_base: 0.514444, name: "Knot" }
            },
            "time": {
                "seconds": { to_base: 1, name: "Second" },
                "minutes": { to_base: 60, name: "Minute" },
                "hours": { to_base: 3600, name: "Hour" },
                "days": { to_base: 86400, name: "Day" },
                "weeks": { to_base: 604800, name: "Week" },
                "months": { to_base: 2592000, name: "Month (30 days)" },
                "years": { to_base: 31536000, name: "Year (365 days)" }
            },
            "data": {
                "bytes": { to_base: 1, name: "Byte" },
                "kilobytes": { to_base: 1024, name: "Kilobyte" },
                "megabytes": { to_base: 1048576, name: "Megabyte" },
                "gigabytes": { to_base: 1073741824, name: "Gigabyte" },
                "terabytes": { to_base: 1099511627776, name: "Terabyte" },
                "bits": { to_base: 0.125, name: "Bit" }
            },
            "pressure": {
                "pascal": { to_base: 1, name: "Pascal" },
                "kilopascal": { to_base: 1000, name: "Kilopascal" },
                "hPa": { to_base: 100, name: "Hectopascal" },
                "bar": { to_base: 100000, name: "Bar" },
                "millibar": { to_base: 100, name: "Millibar" },
                "atm": { to_base: 101325, name: "Atmosphere" },
                "torr": { to_base: 133.322, name: "Torr" },
                "psi": { to_base: 6894.76, name: "Pound per Square Inch" }
            },
            "energy": {
                "joules": { to_base: 1, name: "Joule" },
                "kilojoules": { to_base: 1000, name: "Kilojoule" },
                "calories": { to_base: 4.184, name: "Calorie" },
                "kilocalories": { to_base: 4184, name: "Kilocalorie" },
                "watt-hours": { to_base: 3600, name: "Watt-hour" },
                "kilowatt-hours": { to_base: 3600000, name: "Kilowatt-hour" },
                "btu": { to_base: 1055.06, name: "British Thermal Unit" }
            }
        };
        
        populateUnitSelectors(categorySelect.value);
    }
    
    function populateUnitSelectors(category) {
        fromUnitSelect.innerHTML = '';
        toUnitSelect.innerHTML = '';
        
        if (!converterData[category]) {
            fromUnitSelect.innerHTML = '<option>No units</option>';
            toUnitSelect.innerHTML = '<option>No units</option>';
            return;
        }
        
        const units = converterData[category];
        for (const key in units) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = units[key].name;
            fromUnitSelect.appendChild(option);
            
            const toOption = document.createElement('option');
            toOption.value = key;
            toOption.textContent = units[key].name;
            toUnitSelect.appendChild(toOption);
        }
        
        // Select the first units by default, but swap for temperature
        if (fromUnitSelect.options.length > 0) {
            fromUnitSelect.selectedIndex = 0;
        }
        if (toUnitSelect.options.length > 0) {
            if (category === 'temperature') {
                // Default Celsius to Fahrenheit for temperature
                for (let i = 0; i < toUnitSelect.options.length; i++) {
                    if (toUnitSelect.options[i].value === 'fahrenheit') {
                        toUnitSelect.selectedIndex = i;
                        break;
                    }
                }
            } else {
                toUnitSelect.selectedIndex = 1;
            }
        }
    }
    
    function performConversion() {
        const category = categorySelect.value;
        const valueFrom = parseFloat(converterValueFromInput.value) || 0;
        const fromUnitKey = fromUnitSelect.value;
        const toUnitKey = toUnitSelect.value;
        
        if (!converterData[category] || !converterData[category][fromUnitKey] || !converterData[category][toUnitKey]) {
            converterValueToInput.value = 'N/A';
            conversionFormulaDisplay.textContent = 'Conversion error: Units not found.';
            return;
        }
        
        const fromUnitDef = converterData[category][fromUnitKey];
        const toUnitDef = converterData[category][toUnitKey];
        let result;
        let formula = '';
        
        if (category === 'temperature') {
            result = convertTemperature(valueFrom, fromUnitKey, toUnitKey);
            formula = getTemperatureFormula(fromUnitKey, toUnitKey);
        } else {
            if (!fromUnitDef.to_base || !toUnitDef.to_base) {
                converterValueToInput.value = 'N/A';
                conversionFormulaDisplay.textContent = 'Unit definition missing';
                return;
            }
            const valueInBase = valueFrom * fromUnitDef.to_base;
            result = valueInBase / toUnitDef.to_base;
            const oneUnitFromInBase = 1 * fromUnitDef.to_base;
            const oneUnitFromInTo = oneUnitFromInBase / toUnitDef.to_base;
            formula = `1 ${fromUnitKey} = ${oneUnitFromInTo.toFixed(6)} ${toUnitKey}`;
        }
        
        converterValueToInput.value = formatNumberForDisplay(String(roundToSpecifiedDecimals(result)));
        conversionFormulaDisplay.textContent = formula;
        
        // Add to conversion history
        addToConversionHistory(category, valueFrom, fromUnitKey, result, toUnitKey);
    }
    
    function addToConversionHistory(category, valueFrom, fromUnit, valueTo, toUnit) {
        const fromUnitName = converterData[category][fromUnit].name;
        const toUnitName = converterData[category][toUnit].name;
        
        conversionHistory.unshift({
            category: category,
            fromValue: valueFrom,
            fromUnit: fromUnit,
            fromUnitName: fromUnitName,
            toValue: valueTo,
            toUnit: toUnit,
            toUnitName: toUnitName,
            timestamp: new Date().toISOString()
        });
        
        if (conversionHistory.length > 10) {
            conversionHistory.pop();
        }
        
        updateConversionHistoryDisplay();
    }
    
    function updateConversionHistoryDisplay() {
        conversionHistoryList.innerHTML = '';
        
        conversionHistory.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.fromValue} ${item.fromUnitName} → ${formatNumberForDisplay(item.toValue.toFixed(4))} ${item.toUnitName}</span>
                <button class="mini-btn" data-from="${item.fromUnit}" data-to="${item.toUnit}" data-value="${item.fromValue}">↻</button>
            `;
            conversionHistoryList.appendChild(li);
        });
        
        // Add event listeners to history items
        document.querySelectorAll('#conversion-history-list .mini-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const fromUnit = btn.dataset.from;
                const toUnit = btn.dataset.to;
                const value = btn.dataset.value;
                
                // Find the units in the selectors
                for (let i = 0; i < fromUnitSelect.options.length; i++) {
                    if (fromUnitSelect.options[i].value === fromUnit) {
                        fromUnitSelect.selectedIndex = i;
                        break;
                    }
                }
                
                for (let i = 0; i < toUnitSelect.options.length; i++) {
                    if (toUnitSelect.options[i].value === toUnit) {
                        toUnitSelect.selectedIndex = i;
                        break;
                    }
                }
                
                converterValueFromInput.value = value;
                performConversion();
            });
        });
    }
    
    function swapUnits() {
        const temp = fromUnitSelect.value;
        fromUnitSelect.value = toUnitSelect.value;
        toUnitSelect.value = temp;
        performConversion();
    }
    
    function convertTemperature(value, from, to) {
        if (from === to) return value;
        let kelvin;
        
        // Convert to Kelvin (base)
        if (from === 'celsius') kelvin = value + 273.15;
        else if (from === 'fahrenheit') kelvin = (value - 32) * 5/9 + 273.15;
        else kelvin = value; // Already Kelvin
        
        // Convert from Kelvin
        if (to === 'celsius') return kelvin - 273.15;
        if (to === 'fahrenheit') return (kelvin - 273.15) * 9/5 + 32;
        return kelvin; // To Kelvin
    }
    
    function getTemperatureFormula(from, to) {
        if (from === to) return `Value in ${from}`;
        if (from === 'celsius' && to === 'fahrenheit') return '°F = (°C × 9/5) + 32';
        if (from === 'celsius' && to === 'kelvin') return 'K = °C + 273.15';
        if (from === 'fahrenheit' && to === 'celsius') return '°C = (°F - 32) × 5/9';
        if (from === 'fahrenheit' && to === 'kelvin') return 'K = (°F - 32) × 5/9 + 273.15';
        if (from === 'kelvin' && to === 'celsius') return '°C = K - 273.15';
        if (from === 'kelvin' && to === 'fahrenheit') return '°F = (K - 273.15) × 9/5 + 32';
        return 'Formula N/A';
    }
    
    // --- Helper Functions ---
    function convertToRadiansIfNeeded(value) {
        if (currentAngleUnit === 'deg') return value * Math.PI / 180;
        if (currentAngleUnit === 'grad') return value * Math.PI / 200;
        return value; // Already in radians
    }
    
    function convertFromRadiansIfNeeded(value) {
        if (currentAngleUnit === 'deg') return value * 180 / Math.PI;
        if (currentAngleUnit === 'grad') return value * 200 / Math.PI;
        return value;
    }
    
    function factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        if (n > 170) {
            currentInput = 'Infinity';
            updateDisplay();
            return Infinity;
        }
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
    
    // --- TVM Formulas ---
    function PV_CALC(RATE, NPER, PMT, FV, TYPE = 0) {
        if (RATE === 0) {
            return FV + PMT * NPER;
        }
        const factor = Math.pow(1 + RATE, NPER);
        return (FV + PMT * (1 + RATE * TYPE) * ((factor - 1) / RATE)) / factor;
    }
    
    function FV_CALC(RATE, NPER, PMT, PV, TYPE = 0) {
        if (RATE === 0) {
            return PV + PMT * NPER;
        }
        const factor = Math.pow(1 + RATE, NPER);
        return PV * factor + PMT * (1 + RATE * TYPE) * ((factor - 1) / RATE);
    }
    
    function PMT_CALC(RATE, NPER, PV, FV, TYPE = 0) {
        if (RATE === 0) {
            return (FV - PV) / NPER;
        }
        const factor = Math.pow(1 + RATE, NPER);
        return (FV - PV * factor) * RATE / ((1 + RATE * TYPE) * (factor - 1));
    }
    
    function RATE_CALC(NPER, PMT, PV, FV, TYPE = 0, GUESS = 0.1) {
        let rate = GUESS;
        let low = 0;
        let high = 1;
        const tolerance = 0.000001;
        let result = 0;
        
        for (let i = 0; i < 100; i++) {
            const pv = PV_CALC(rate, NPER, PMT, FV, TYPE);
            result = pv - PV;
            
            if (Math.abs(result) <= tolerance) {
                return rate;
            }
            
            if (result > 0) {
                low = rate;
            } else {
                high = rate;
            }
            rate = (low + high) / 2;
        }
        return rate;
    }
    
    function NPER_CALC(RATE, PMT, PV, FV, TYPE = 0) {
        if (RATE === 0) {
            return (FV - PV) / PMT;
        }
        return Math.log((FV + PMT * (1 + RATE * TYPE) / RATE) / (PV + PMT * (1 + RATE * TYPE) / RATE)) / Math.log(1 + RATE);
    }
    
    // --- Keyboard Support ---
    function handleKeyboardInput(event) {
        const key = event.key;
        
        switch (key) {
            case '0': case '1': case '2': case '3': case '4':
            case '5': case '6': case '7': case '8': case '9': case '.':
                appendNumber(key);
                break;
            case '+': case '-': case '*': case '/': case '^':
                setOperation(key);
                break;
            case 'Enter':
                calculate();
                break;
            case 'Escape':
                handleFunction('AC');
                break;
            case '%':
                handleFunction('%');
                break;
            case 'Backspace':
                if (currentInput.length > 1) {
                    currentInput = currentInput.slice(0, -1);
                } else {
                    currentInput = '0';
                }
                updateDisplay();
                break;
            case 'Delete':
                handleFunction('AC');
                break;
            case 'p': // For PI
                handleScientificFunction('π');
                break;
            case 'e':
                handleScientificFunction('e');
                break;
            default:
                // Handle scientific functions
                if (key === 's') handleScientificFunction('sin');
                if (key === 'c') handleScientificFunction('cos');
                if (key === 't') handleScientificFunction('tan');
                if (key === 'l') handleScientificFunction('log');
                if (key === 'n') handleScientificFunction('ln');
                if (key === 'r') handleScientificFunction('√');
                if (key === 'y') handleScientificFunction('x²');
        }
    }
    
    // --- Initialize the calculator ---
    init();
});