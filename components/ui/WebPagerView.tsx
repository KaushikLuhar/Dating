import React from 'react';
import { Platform, ScrollView, View, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PagerViewProps {
  children: React.ReactNode;
  onPageSelected?: (event: { nativeEvent: { position: number } }) => void;
  ref?: React.RefObject<any>;
  style?: any;
  [key: string]: any;
}

const PagerView = React.forwardRef<any, PagerViewProps>(
  ({ children, onPageSelected, style, ...props }, ref) => {
    const [currentPage, setCurrentPage] = React.useState(0);
    const scrollViewRef = React.useRef<ScrollView>(null);

    const handleScroll = (event: any) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const page = Math.round(offsetX / SCREEN_WIDTH);
      if (page !== currentPage) {
        setCurrentPage(page);
        onPageSelected?.({ nativeEvent: { position: page } });
      }
    };

    const scrollToPage = (page: number) => {
      scrollViewRef.current?.scrollTo({
        x: page * SCREEN_WIDTH,
        animated: true,
      });
      setCurrentPage(page);
    };

    React.useImperativeHandle(ref, () => ({
      setPage: scrollToPage,
    }));

    return (
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={[{ flex: 1 }, style]}
        contentContainerStyle={{ flexDirection: 'row' }}
        {...props}
      >
        {React.Children.map(children, (child, index) => (
          <View key={index} style={{ width: SCREEN_WIDTH, flexShrink: 0 }}>
            {child}
          </View>
        ))}
      </ScrollView>
    );
  }
);

PagerView.displayName = 'PagerView';

// Export as both default and named export for compatibility
export default PagerView;
export { PagerView };
