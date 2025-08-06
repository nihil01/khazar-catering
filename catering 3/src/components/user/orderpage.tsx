// src/components/OrderPage.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { useLang } from '../../utils/LangContext';

export const OrderPage: React.FC = () => {
  const { theme } = useTheme();
  const { lang } = useLang();
  const isDarkTheme = theme === 'dark';

  // Переводы
  const translations = {
    EN: {
      title: "Create Your Order",
    limit: "Please, wait 2 minutes",
      back: "Back",
      next: "Next",
      submit: "Submit Order",
      alertField: "Please fill in the current field.",
      alertSubmit: "Please fill in all fields before submitting.",
      success: "Your order has been accepted! We will contact you shortly.",
      cities: [
        "Baku", "Ganja", "Sumgayit", "Mingachevir", "Nakhchivan", "Lankaran",
        "Sheki", "Shirvan", "Yevlakh", "Khachmaz", "Quba", "Astara", "Zagatala",
        "Gabala", "Sabirabad", "Salyan", "Jalilabad", "Gazakh", "Barda",
        "Agdash", "Tovuz", "Kurdamir", "Agdam", "Fuzuli", "Lachin", "Kalbajar",
        "Zangilan", "Gubadli", "Jabrayil", "Khojaly", "Khojavend", "Shusha",
        "Khankendi", "Naftalan", "Imishli", "Masalli", "Bilasuvar", "Goychay",
        "Ismayilli", "Gakh", "Gadabay", "Dashkasan", "Qusar", "Samukh",
        "Siazan", "Ujar", "Khizi"
      ],
      events: ["Bento Catering", "Home Food", "Corporate Meals", "Buffet"],
      persons: ["Less than 50", "50-100", "100-200", "200-300", "300-500", "More than 500"],
      cuisine: ["Non-vegetarian", "Vegetarian"],
      form: [
        { label: "Your Name", placeholder: "Enter your name" },
        { label: "Your Email", placeholder: "example@email.com" },
        { label: "Phone Number", placeholder: "50 535 44 11" },
        { label: "Choose City" },
        { label: "Choose Event" },
        { label: "Number of Guests" },
        { label: "Cuisine Type" },
        { label: "Event Date" },
      ]
    },
    RU: {
      title: "Создайте Ваш Заказ",
    limit: "Пожалуйста, подождите в течении 2 минут",
      back: "Назад",
      next: "Далее",
      submit: "Отправить заказ",
      alertField: "Пожалуйста, заполните текущее поле.",
      alertSubmit: "Пожалуйста, заполните все поля перед отправкой.",
      success: "Ваш заказ принят! Мы свяжемся с вами в ближайшее время.",
      cities: [
        "Баку", "Гянджа", "Сумгаит", "Мингечаур", "Нахичевань", "Ленкорань",
        "Шеки", "Ширван", "Евлах", "Хачмач", "Губа", "Астара", "Загатала",
        "Габала", "Сабирабад", "Сальян", "Джалилабад", "Газах", "Барда",
        "Агдаш", "Товуз", "Кюрдамир", "Агдам", "Физули", "Лачын", "Кельбаджар",
        "Зангелан", "Губадлы", "Джебраил", "Ходжалы", "Ходжавенд", "Шуша",
        "Ханкенди", "Нафталан", "Имишли", "Масаллы", "Билясувар", "Гёйчай",
        "Исмаиллы", "Гах", "Гедабек", "Дашкесан", "Кусары", "Самух",
        "Сиазань", "Уджар", "Хызы"
      ],
      events: ["Бенто Кейтеринг", "Домашняя еда", "Корпоративное питание", "Шведский стол"],
      persons: ["Менее 50", "50-100", "100-200", "200-300", "300-500", "Более 500"],
      cuisine: ["Не вегетарианская", "Вегетарианская"],
      form: [
        { label: "Ваше имя", placeholder: "Введите ваше имя" },
        { label: "Ваш Email", placeholder: "example@email.com" },
        { label: "Номер телефона", placeholder: "50 535 44 11" },
        { label: "Выберите город" },
        { label: "Выберите событие" },
        { label: "Количество персон" },
        { label: "Тип кухни" },
        { label: "Выберите дату мероприятия" },
      ]
    },
    AZ: {
      title: "Sifarişinizi yaradın",
    limit: "Zehmet olmasa, 2 deq gozleyin ..",
      back: "Geri",
      next: "İrəli",
      submit: "Sifarişi göndər",
      alertField: "Zəhmət olmasa cari sahəni doldurun.",
      alertSubmit: "Zəhmət olmasa bütün sahələri doldurun.",
      success: "Sifarişiniz qəbul edildi! Tezliklə sizinlə əlaqə saxlayacağıq.",
      cities: [
        "Bakı", "Gəncə", "Sumqayıt", "Mingəçevir", "Naxçıvan", "Lənkəran",
        "Şəki", "Şirvan", "Yevlax", "Xaçmaz", "Quba", "Astara", "Zaqatala",
        "Qəbələ", "Sabirabad", "Salyan", "Cəlilabad", "Qazax", "Bərdə",
        "Ağdaş", "Tovuz", "Kürdəmir", "Ağdam", "Füzuli", "Laçın", "Kəlbəcər",
        "Zəngilan", "Qubadlı", "Cəbrayıl", "Xocalı", "Xocavənd", "Şuşa",
        "Xankəndi", "Naftalan", "İmişli", "Masallı", "Biləsuvar", "Göyçay",
        "İsmayıllı", "Qax", "Gədəbəy", "Daşkəsən", "Qusar", "Samux", "Siyəzən",
        "Ucar", "Xızı"
      ],
      events: ["Bento Caterinq", "Ev yeməyi", "Korporativ qidalanma", "Furşet"],
      persons: ["50-dən az", "50-100", "100-200", "200-300", "300-500", "500-dən çox"],
      cuisine: ["Vegetarian olmayan", "Vegetarian"],
      form: [
        { label: "Adınız", placeholder: "Adınızı daxil edin" },
        { label: "Email ünvanınız", placeholder: "example@email.com" },
        { label: "Telefon nömrəsi", placeholder: "50 535 44 11" },
        { label: "Şəhəri seçin" },
        { label: "Tədbiri seçin" },
        { label: "Şəxslərin sayı" },
        { label: "Mətbəx növü" },
        { label: "Tədbir tarixi" },
      ]
    }
  } as const;

  const t = translations[lang];

  // State
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    city: '',
    eventType: '',
    persons: '',
    cuisineType: '',
    eventDate: '',
  });

  // Steps с привязкой к переводу
  const formSteps = t.form.map((f, index) => {
    const names = ["name", "email", "phoneNumber", "city", "eventType", "persons", "cuisineType", "eventDate"];
    return {
      label: f.label,
      name: names[index],
      type:
          index === 3 || index === 5 ? "select" :
              index === 4 || index === 6 ? "radio" :
                  index === 2 ? "tel" :
                      index === 7 ? "date" : "text",
      options:
          index === 3 ? t.cities :
              index === 4 ? t.events :
                  index === 5 ? t.persons :
                      index === 6 ? t.cuisine : undefined,
      placeholder: f.placeholder
    };
  });

  // Обработчики
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';
    if (value.length > 0) formattedValue += value.substring(0, 2);
    if (value.length > 2) formattedValue += ' ' + value.substring(2, 5);
    if (value.length > 5) formattedValue += ' ' + value.substring(5, 7);
    if (value.length > 7) formattedValue += ' ' + value.substring(7, 9);
    formattedValue = formattedValue.substring(0, 12).trim();
    setFormData(prev => ({ ...prev, phoneNumber: formattedValue }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 0: return formData.name.trim() !== '';
      case 1: return formData.email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      case 2: return formData.phoneNumber.replace(/\D/g, '').length === 9;
      case 3: return formData.city.trim() !== '';
      case 4: return formData.eventType.trim() !== '';
      case 5: return formData.persons.trim() !== '';
      case 6: return formData.cuisineType.trim() !== '';
      case 7: return formData.eventDate.trim() !== '';
      default: return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    } else {
      alert(t.alertField);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === formSteps.length - 1) {
      if (validateStep(currentStep)) {
        const fullPhoneNumber = '994' + formData.phoneNumber.replace(/\s/g, '');
        console.log("Order Data Submitted:", { ...formData, phoneNumber: fullPhoneNumber });
        alert(t.success);

        fetch("/api/v1/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(formData)
        }).then((response: Response) => {
            if (response.status === 200) {
                setFormData({
                    name: '', email: '', phoneNumber: '', city: '',
                    eventType: '', persons: '', cuisineType: '', eventDate: '',
                });
                setCurrentStep(0);
            }else if(response.status === 429) {
                alert(t.limit);
            }
            else{
                alert(t.alertSubmit);
            }
        })


      } else {
          alert(t.alertSubmit);
      }
    }
  };

  // Цвета
  const primaryBg = isDarkTheme ? 'bg-gray-900' : 'bg-gray-100';
  const formCardBg = isDarkTheme ? 'bg-gray-800' : 'bg-white';
  const labelText = isDarkTheme ? 'text-gray-300' : 'text-black';
  const inputBg = isDarkTheme ? 'bg-gray-700' : 'bg-gray-50';
  const inputBorder = isDarkTheme ? 'border-gray-600 focus:border-gray-400' : 'border-gray-300 focus:border-gray-500';
  const inputTextColor = isDarkTheme ? 'text-gray-300' : 'text-black';
  const placeholderText = isDarkTheme ? 'placeholder-gray-400' : 'placeholder-gray-500';
  const selectedOptionBg = isDarkTheme ? 'bg-gray-700 border-gray-500' : 'bg-gray-200 border-gray-400';
  const selectedOptionText = isDarkTheme ? 'text-gray-300' : 'text-black';

  const navButtonBase = 'px-6 py-3 rounded-lg font-semibold text-lg transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50';
  const navButtonDark = 'bg-gray-700 hover:bg-gray-600 text-black focus:ring-gray-500';
  const navButtonLight = 'bg-gray-200 hover:bg-gray-300 text-black focus:ring-gray-500';

  const submitButtonBase = 'ml-auto px-8 py-4 rounded-lg font-bold text-xl transition-colors duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-75';
  const submitButtonDark = 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500';
  const submitButtonLight = 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500';

  return (
      <motion.section
          className={`w-full min-h-screen px-4 py-10 font-sans flex items-center justify-center ${primaryBg} ${isDarkTheme ? 'text-gray-300' : 'text-black'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <div className={`relative w-full max-w-2xl mx-auto rounded-xl shadow-2xl overflow-hidden ${formCardBg} p-4 sm:p-6 md:p-8`}>
          <h2 className={`text-3xl sm:text-4xl font-extrabold mb-6 text-center ${labelText}`}>
            {t.title}
          </h2>

          {/* Прогресс */}
          <div className="mb-6 flex justify-center items-center">
            {formSteps.map((_, index) => (
                <div key={index} className="flex items-center">
                  <div className="relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300
                                 ${index <= currentStep ? (isDarkTheme ? 'bg-indigo-600 text-white' : 'bg-indigo-500 text-white') : (isDarkTheme ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-black')}`}>
                      {index + 1}
                    </div>
                    {index === currentStep && (
                        <motion.svg
                            key={`svg-step-${index}`}
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                          <motion.circle
                              cx="20"
                              cy="20"
                              r="18"
                              stroke={isDarkTheme ? '#A78BFA' : '#6366F1'}
                              strokeWidth="2"
                              fill="none"
                              strokeDasharray="113"
                              initial={{ strokeDashoffset: 113 }}
                              animate={{ strokeDashoffset: 0 }}
                              transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
                          />
                        </motion.svg>
                    )}
                  </div>
                  {index < formSteps.length - 1 && (
                      <div className={`flex-1 h-1 mx-2 transition-all duration-300
                                 ${index < currentStep ? (isDarkTheme ? 'bg-indigo-600' : 'bg-indigo-500') : (isDarkTheme ? 'bg-gray-700' : 'bg-gray-200')}`} style={{ width: '40px' }}></div>
                  )}
                </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: direction * 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -50 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="relative min-h-[150px] flex flex-col justify-between"
              >
                {(() => {
                  const step = formSteps[currentStep];
                  if (!step) return null;

                  return (
                  <div className="mb-6">
                    <label htmlFor={step.name} className={`block text-xl sm:text-2xl font-semibold mb-4 text-center ${labelText}`}>
                      {step.label}
                    </label>

                    {step.type === "text" || step.type === "email" || step.type === "date" ? (
                        <input
                            type={step.type}
                            id={step.name}
                            name={step.name}
                            value={(formData as any)[step.name]}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg transition-all duration-200 ${inputBorder} ${inputBg} ${inputTextColor} ${placeholderText}`}
                            placeholder={step.placeholder}
                            required
                            autoFocus
                        />
                    ) : step.type === "tel" ? (
                        <div className="relative flex items-center">
                    <span className={`absolute left-3 text-base font-medium ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                      +994
                    </span>
                          <input
                              type={step.type}
                              id={step.name}
                              name={step.name}
                              value={formData.phoneNumber}
                              onChange={handlePhoneChange}
                              className={`flex-1 pl-16 p-3 border rounded-lg transition-all duration-200 ${inputBorder} ${inputBg} ${inputTextColor} ${placeholderText}`}
                              placeholder={step.placeholder}
                              required
                              autoFocus
                              maxLength={12}
                          />
                        </div>
                    ) : step.type === "select" ? (
                        <select
                            id={step.name}
                            name={step.name}
                            value={(formData as any)[step.name]}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg transition-all duration-200 appearance-none bg-no-repeat bg-[right_0.75rem_center] pr-10 cursor-pointer
                                ${inputBorder} ${inputBg} ${inputTextColor}`}
                            required
                            autoFocus
                        >
                          <option value="">-- {step.placeholder || step.label} --</option>
                          {step.options?.map((option, idx) => (
                              <option key={idx} value={option}>{option}</option>
                          ))}
                        </select>
                    ) : step.type === "radio" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {step.options?.map((option, idx) => (
                              <label
                                  key={idx}
                                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200
                                    ${inputBorder} ${inputBg}
                                    ${(formData as any)[step.name] === option ? selectedOptionBg : ''}`}
                              >
                                <input
                                    type="radio"
                                    name={step.name}
                                    value={option}
                                    checked={(formData as any)[step.name] === option}
                                    onChange={handleChange}
                                    className={`form-radio h-5 w-5 ${isDarkTheme ? 'text-indigo-500' : 'text-indigo-600'} focus:ring-indigo-500`}
                                    required
                                />
                                <span className={`ml-3 text-base font-medium ${(formData as any)[step.name] === option ? selectedOptionText : inputTextColor}`}>
                          {option}
                        </span>
                              </label>
                          ))}
                        </div>
                    ) : null}
                  </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              {currentStep > 0 && (
                  <button
                      type="button"
                      onClick={handleBack}
                      className={`${navButtonBase} ${isDarkTheme ? navButtonDark : navButtonLight}`}
                  >
                    {t.back}
                  </button>
              )}

              {currentStep < formSteps.length - 1 && (
                  <button
                      type="button"
                      onClick={handleNext}
                      className={`ml-auto ${navButtonBase} ${isDarkTheme ? navButtonDark : navButtonLight}`}
                  >
                    {t.next}
                  </button>
              )}

              {currentStep === formSteps.length - 1 && (
                  <button
                      type="submit"
                      className={`${submitButtonBase} ${isDarkTheme ? submitButtonDark : submitButtonLight}`}
                  >
                    {t.submit}
                  </button>
              )}
            </div>
          </form>
        </div>
      </motion.section>
  );
};
