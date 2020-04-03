#import "ServiceKeyReader.h"
#import <UIKit/UIKit.h>

@implementation ServiceKeyReader

//export the name of the native module as 'Device' since no explicit name is mentioned
RCT_EXPORT_MODULE();

//exports a method getDeviceName to javascript
RCT_EXPORT_METHOD(getServiceKey:(RCTResponseSenderBlock)callback){
 @try{
   //load the main bundle
   NSBundle* mainBundle = [NSBundle mainBundle];
   
   //read the service key I've added to info.plist connecting to the build setting
   NSString *value = [mainBundle objectForInfoDictionaryKey:@"SERVICE_KEY"];
   callback(@[[NSNull null], value]);
 }
 @catch(NSException *exception){
   callback(@[exception.reason, [NSNull null]]);
 }
}

@end
