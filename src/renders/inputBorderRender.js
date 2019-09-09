/**
 * Возможный минус данного рендера:
 * Мы не отслеживаем состояние валидности элемента (is-valid или is-invalid)
 * и лишь устанавливаем текущее значение на основании validity.
 */

export default (link, validity, element) => {
  const { url, duplicate } = validity;

  const isLinkValid = url && duplicate;
  const [currentClass, previousClass] = isLinkValid ? ['is-valid', 'is-invalid'] : ['is-invalid', 'is-valid'];

  if (!link) {
    element.classList.remove(previousClass);
    element.classList.remove(currentClass);
  } else {
    element.classList.remove(previousClass);
    element.classList.add(currentClass);
  }
};
