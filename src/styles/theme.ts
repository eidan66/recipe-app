const theme = {
  colors: {
    primary: '#BB86FC', // 🔹 צבע ראשי (למשל, כפתורים בולטים)
    primaryVariant: '#3700B3', // 🔹 וריאנט כהה יותר של הצבע הראשי
    secondary: '#03DAC6', // 🔹 צבע משני (למשל, קישורים או אלמנטים משניים)

    background: '#121212', // 🔹 רקע כללי (עמודים, טפסים וכו')
    surface: '#1E1E1E', // 🔹 רקע למשטחי כרטיסיות, פאנלים וכו'

    error: '#CF6679', // 🔺 שגיאות, אזהרות או הודעות בעייתיות
    warning: '#FFB74D', // 🔶 הודעות אזהרה
    success: '#4CAF50', // ✅ הודעות הצלחה
    info: '#2196F3', // 🔹 הודעות מידע

    // צבעי טקסט
    textPrimary: '#FFFFFF', // 🔹 טקסט ראשי (בולט, כותרות)
    textSecondary: '#B0B0B0', // 🔹 טקסט משני (טקסט פחות חשוב)
    textDisabled: '#757575', // 🔹 טקסט במצב לא פעיל

    // צבעי גבולות
    border: '#2C2C2C',

    // צבעי טקסט על רקעים שונים
    onPrimary: '#000000', // טקסט על רקע primary
    onSecondary: '#000000', // טקסט על רקע secondary
    onBackground: '#FFFFFF', // טקסט על רקע background
    onSurface: '#FFFFFF', // טקסט על משטחים
    onError: '#000000', // טקסט על רקע error
  },

  fonts: {
    main: 'Arial, sans-serif',
    code: 'Courier New, monospace',
  },

  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },

  borderRadius: '8px',
};

export default theme;
