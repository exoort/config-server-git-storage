export const startMemoryProfiler = () => {
  setInterval(() => {
    const {
      heapUsed: used, rss, heapTotal: tot, external: ext,
    } = process.memoryUsage();

    const f = (value) => (!value ? '-' : `${Math.round(value / 1048576)} MB`);
    const timestamp = new Date().toTimeString().substr(0, 8);
    // eslint-disable-next-line no-console
    console.log(
      `[${timestamp}] Memory usage: ${f(used)} (RSS: ${f(rss)}) - total heap: ${f(tot)} - external: ${f(ext)}`,
    );
  }, 10000);
};
