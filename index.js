document.addEventListener('DOMContentLoaded', function() {
            const systemSelect = document.getElementById('system');
            const metricInputs = document.getElementById('metric-inputs');
            const imperialInputs = document.getElementById('imperial-inputs');
            const calculateBtn = document.getElementById('calculate');
            const resultDiv = document.getElementById('result');
            const bmiValue = document.getElementById('bmi-value');
            const bmiCategory = document.getElementById('bmi-category');
            const bmiInfo = document.getElementById('bmi-info');
            const genderSpecificInfo = document.getElementById('gender-specific-info');
            const bmiPointer = document.getElementById('bmi-pointer');
            
            // Toggle between metric and imperial inputs
            systemSelect.addEventListener('change', function() {
                if (this.value === 'metric') {
                    metricInputs.style.display = 'block';
                    imperialInputs.style.display = 'none';
                } else {
                    metricInputs.style.display = 'none';
                    imperialInputs.style.display = 'block';
                }
                // Clear results when switching systems
                resultDiv.style.display = 'none';
            });
            
            // Calculate BMI
            calculateBtn.addEventListener('click', function() {
                let weight, height, bmi;
                const gender = document.querySelector('input[name="gender"]:checked').value;
                
                if (systemSelect.value === 'metric') {
                    weight = parseFloat(document.getElementById('weight').value);
                    height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to m
                    
                    if (!weight || !height || weight <= 0 || height <= 0) {
                        alert('Please enter valid weight and height values');
                        return;
                    }
                    
                    bmi = weight / (height * height);
                } else {
                    weight = parseFloat(document.getElementById('weight-lbs').value);
                    const feet = parseFloat(document.getElementById('height-ft').value);
                    const inches = parseFloat(document.getElementById('height-in').value);
                    
                    if (!weight || isNaN(feet) || isNaN(inches) || weight <= 0 || feet < 0 || inches < 0) {
                        alert('Please enter valid weight and height values');
                        return;
                    }
                    
                    height = feet * 12 + inches; // Convert to inches
                    bmi = (weight / (height * height)) * 703;
                }
                
                // Round to one decimal place
                bmi = Math.round(bmi * 10) / 10;
                
                // Determine BMI category
                let category, info, color;
                if (bmi < 18.5) {
                    category = 'Underweight';
                    info = 'You may need to gain weight. Consult with a healthcare provider for guidance.';
                    color = '#4fc3f7';
                } else if (bmi >= 18.5 && bmi < 25) {
                    category = 'Normal weight';
                    info = 'You have a healthy body weight. Maintain your current lifestyle.';
                    color = '#66bb6a';
                } else if (bmi >= 25 && bmi < 30) {
                    category = 'Overweight';
                    info = 'You may need to lose weight. Consider a balanced diet and regular exercise.';
                    color = '#ffca28';
                } else {
                    category = 'Obese';
                    info = 'You may need to lose weight for better health. Consult with a healthcare provider.';
                    color = '#ff7043';
                }
                
                // Gender-specific information
                let genderInfo = '';
                if (gender === 'male') {
                    if (bmi < 18.5) {
                        genderInfo = '<strong>For Men:</strong> Being underweight can affect muscle mass and testosterone levels. Focus on strength training and a protein-rich diet.';
                    } else if (bmi >= 18.5 && bmi < 25) {
                        genderInfo = '<strong>For Men:</strong> Your BMI is in the healthy range. Men typically carry more muscle mass, which can affect BMI accuracy.';
                    } else if (bmi >= 25 && bmi < 30) {
                        genderInfo = '<strong>For Men:</strong> Men tend to store excess weight in the abdominal area, which carries higher health risks. Focus on reducing belly fat.';
                    } else {
                        genderInfo = '<strong>For Men:</strong> Obesity in men is linked to increased risk of heart disease, diabetes, and certain cancers. Consider consulting a healthcare provider.';
                    }
                } else {
                    if (bmi < 18.5) {
                        genderInfo = '<strong>For Women:</strong> Being underweight can affect reproductive health and bone density. Focus on nutrient-dense foods.';
                    } else if (bmi >= 18.5 && bmi < 25) {
                        genderInfo = '<strong>For Women:</strong> Your BMI is in the healthy range. Women naturally have higher body fat percentages than men, which is normal and healthy.';
                    } else if (bmi >= 25 && bmi < 30) {
                        genderInfo = '<strong>For Women:</strong> Women tend to store excess weight in hips and thighs. While this pattern carries lower health risks, maintaining a healthy weight is still important.';
                    } else {
                        genderInfo = '<strong>For Women:</strong> Obesity in women is linked to increased risk of heart disease, diabetes, and reproductive issues. Consider consulting a healthcare provider.';
                    }
                }
                
                // Update UI with results
                bmiValue.textContent = bmi;
                bmiCategory.textContent = category;
                bmiInfo.textContent = info;
                genderSpecificInfo.innerHTML = genderInfo;
                
                // Position the pointer on the BMI scale
                let pointerPosition = 0;
                if (bmi < 18.5) {
                    pointerPosition = (bmi / 18.5) * 25;
                } else if (bmi < 25) {
                    pointerPosition = 25 + ((bmi - 18.5) / 6.5) * 25;
                } else if (bmi < 30) {
                    pointerPosition = 50 + ((bmi - 25) / 5) * 25;
                } else {
                    pointerPosition = 75 + Math.min(((bmi - 30) / 10) * 25, 25);
                }
                
                bmiPointer.style.left = `${pointerPosition}%`;
                resultDiv.style.display = 'block';
                resultDiv.style.border = `2px solid ${color}`;
            });
        });