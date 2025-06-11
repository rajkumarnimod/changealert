declare module 'changealert' {
  interface AlertOptions {
    position?: string;
    timeout?: number;
    type?: string;
    theme?: string;
    icon?: string | null;
    closeButton?: boolean;
    pauseOnHover?: boolean;
    draggable?: boolean;
    progressBar?: boolean;
    sound?: boolean;
    html?: boolean;
    animationIn?: string;
    animationOut?: string;
    onClick?: (e: Event) => void;
    onClose?: () => void;
    onShow?: (el: HTMLElement) => void;
    onTimeout?: () => void;
    rtl?: boolean;
    css?: string;
    queue?: boolean;
    zIndex?: number;
    overlay?: boolean;
    overlayClose?: boolean;
    overlayColor?: string;
    customIcon?: string | null;
    customSound?: string | null;
    buttons?: {
      text: string;
      class?: string;
      style?: string;
      closeOnClick?: boolean;
      action?: () => void;
    }[];
    focus?: boolean;
    fontFamily?: string;
    fontSize?: string;
  }

  interface ChangeAlertInstance {
    show(message: string, options?: AlertOptions): Promise<void>;
    primary(message: string, options?: AlertOptions): Promise<void>;
    secondary(message: string, options?: AlertOptions): Promise<void>;
    success(message: string, options?: AlertOptions): Promise<void>;
    error(message: string, options?: AlertOptions): Promise<void>;
    warning(message: string, options?: AlertOptions): Promise<void>;
    info(message: string, options?: AlertOptions): Promise<void>;
    question(message: string, options?: AlertOptions): Promise<void>;
    loading(message: string, options?: AlertOptions): Promise<void>;
    clear(): void;
    applyTheme(theme: string | Record<string, string>): this;
    setIcons(icons: Record<string, string>): this;
    setSounds(sounds: Record<string, string>): this;
    setThemeMode(mode: 'light' | 'dark'): this;
    setFont(family: string, size?: string): this;
  }

  const ChangeAlert: ChangeAlertInstance;
  export default ChangeAlert;
}
