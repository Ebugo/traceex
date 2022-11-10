export const tabProps = (index: number, tabId: string) => {
  return {
    id: `${tabId}-${index}`,
    'aria-controls': `${tabId}-panel-${index}`,
  };
};
