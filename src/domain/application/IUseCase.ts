interface IUseCase<T extends unknown[], R> {
  execute: (...args: T) => R;
}

export default IUseCase