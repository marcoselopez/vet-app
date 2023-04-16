export const titleFormat = () => {
  let title = {
    fontFamily: 'Poppins',
    fontSize: '2rem',
    letterSpacing: 0,
    color: '#38AA95',
    fontWeight: 'bold',
  }
  return title
};

export const subtitleFormat = () => {
  let subtitle = {
    fontFamily: 'Poppins',
    fontSize: '1.1rem',
    letterSpacing: 0,
    fontWeight: '400'
  }
  return subtitle;
};

export const textFormat = () => {
  let text = {
    fontFamily: 'Poppins',
    textAlign: 'center',
    fontSize: '1rem',
    letterSpacing: 0,
    fontWeight: '300'
  }
  return text;
};

export const waveAnimationFormat = () => {
  let waveAnimation = {
      background: 'red',
      background: 'linear-gradient(145deg, rgba(29,75,70,1) 0%, rgba(61,208,161,1) 100%)',
      backgroundSize: '400% 400%',
      "@keyframes gradient": {
        "0%": {
          backgroundPosition: '0% 50%'
        },
        '50%': {
          backgroundPosition: '100% 50%'
        },
        '100%': {
          backgroundPosition: '0% 50%'
        }
      },
      animation: 'gradient 5s ease infinite'
    }
    return waveAnimation;
  }