
const {Builder, Browser, By, Key, until} = require("selenium-webdriver");
// require("chromedriver");

// async function example() {

//     var searchString = "Automation testing with Selenium and JavaScript";

//     //To wait for browser to build and launch properly
//     let driver = await new Builder().forBrowser("chrome").build();

//     //To fetch http://google.com from the browser with our code.
//     await driver.get("http://google.com");

//     //To send a search query by passing the value in searchString.
//     await driver.findElement(By.name("q")).sendKeys(searchString, Key.RETURN);

//     //Verify the page title and print it
//     var title = await driver.getTitle();
//     console.log('Title is:', title);

//     //It is always a safe practice to quit the browser after execution
//     await driver.quit();

// }

const USER = 'bw_user';
const CONF = require('./../../../../data/bcred.json');
// const CONF = yaml.load(open(os.path.join(__location__, 'creds.yml')),Loader=yaml.Loader)



class session {

    constructor() {
        // this.institution ;
        this.init();
        
    }


    async *__exit__() {
        await this.driver.quit();
    }

    async *init() {
        this.driver = await new Builder().forBrowser(Browser.FIREFOX).build();
        this.login();
    }

    async *login() {

        let url = CONF[USER]['login_url'];
        let usernameId = CONF[USER]['username_ref'];
        let username = CONF[USER]['username'];
        let passwordId = CONF[USER]['password_ref'];
        let password = CONF[USER]['password'];
        let submit_buttonId = CONF[USER]['submit_ref'];

        // let domain = urlparse(url).netloc

        // this.inst = models.Institution.objects.filter(name = domain).first()

        // if not this.inst:
        // this.inst = models.Institution()

        // this.inst.name = domain
        // this.inst.active = True
        // this.inst.save()

        // this.driver.get(url)
        await this.driver.get(url);
        var elmUser = await this.driver.find_element(By.Id, usernameId);
        await elmUser.send_keys(username);

        var elmpassword = await this.driver.find_element(By.ID, passwordId);
        await elmpassword.send_keys(password);

        var elmSubmit = await this.driver.find_element(By.ID, submit_buttonId);
        await elmSubmit.click();

        // # return inst

    }


    // def getAccounts(self):

    //     time.sleep(5)

    //     accLinks = []

    //     if USER == 'bw_user':
    //         accounts = this.driver.find_element(By.ID, '_ctl0_ContentMain_grdBalances').find_element(By.TAG_NAME, 'tbody').find_elements(By.TAG_NAME, 'tr')

    //         for account in accounts:
    //             accLinks.append(account.find_elements(By.TAG_NAME,'td')[1].find_element(By.TAG_NAME, 'a').get_property('href'))


    //     elif USER == 'cb_user':
    //         accounts = this.driver.find_elements(By.CLASS_NAME, 'account-link')

    //         for account in accounts:
    //             accLinks.append(account.get_property('href'))


    //     this.processAccounts(accLinks)


    // def processAccounts(self, accounts):
    //     for accLink in accounts:

    //         this.driver.get(accLink)

    //         time.sleep(5)

    //         number = ''


    //         if USER == 'bw_user':

    //             name = this.driver.find_element(By.ID,'_ctl0_ContentMain__ctl0_lblAccountNickname').text
    //             balance = currencyHandler(this.driver.find_element(By.ID,'_ctl0_ContentMain__ctl0_lblCurrentBalance').text)                                

    //             tt = this.driver.find_element(By.ID,'_ctl0_ContentMain_drpAccount').find_elements(By.TAG_NAME, 'option')
    //             for i in tt:
    //                 print(i.text)
    //                 print(i.get_property('selected'))
    //                 if i.get_property('selected') == 'selected':
    //                     print(i.get_property('value'))

    //                     number = i.get_property('value')
    //                     break 


    //         elif USER == 'cb_user':
    //             number = this.driver.find_element(By.CLASS_NAME,'accountnumber').text.split('\n')[1]
    //             name = this.driver.find_element(By.CLASS_NAME,'account-switcher-product').text
    //             balance = currencyHandler(this.driver.find_element(By.ID,'account-summary-Balance-amount').find_element(By.TAG_NAME, 'span').text.split('\n')[0])

    //         # print(acc.__dict__)


    //         acc = models.Account.objects.filter(institution=this.inst, name= name).first()

    //         if not acc:
    //             acc = models.Account()
    //             acc.institution = this.inst    

    //         acc.link = accLink
    //         acc.name = name
    //         acc.number = number
    //         acc.balance = balance

    //         # print(acc.__dict__)

    //         acc.save()


    //         this.getTransactions(acc)


    // def duplicateChecker(self,transaction):

    //     matches = models.Transaction.objects.filter(
    //         account = transaction.account, 
    //         transaction_date = transaction.transaction_date,
    //         description = transaction.description,
    //         debit = transaction.debit,
    //         credit = transaction.credit,
    //     ).values()

    //     if len(matches) > 0:
    //         return True

    //     return False

    // def getTransactions(self,acc):

    //     insertList = []

    //     if USER == 'bw_user':
    //         transactions = this.driver.find_element(By.ID, '_ctl0_ContentMain_grdTransactionList').find_element(By.TAG_NAME, 'tbody').find_elements(By.TAG_NAME, 'tr')

    //         for transaction in transactions:

    //             mTransaction = models.Transaction()

    //             mTransaction.account = acc
    //             mTransaction.transaction_date = datetime.strptime(transaction.find_elements(By.TAG_NAME, 'td')[0].text, '%d/%m/%Y')

    //             mTransaction.debit = currencyHandler(transaction.find_elements(By.TAG_NAME, 'td')[3].text)
    //             mTransaction.credit = currencyHandler(transaction.find_elements(By.TAG_NAME, 'td')[4].text)
    //             mTransaction.description = transaction.find_elements(By.TAG_NAME, 'td')[1].text

    //             # if not this.duplicateChecker(mTransaction):
    //             insertList.append(mTransaction)


    //     elif USER == 'cb_user':

    //         transactions = this.driver.find_element(By.ID, 'non-pending-transactions-table').find_elements(By.CLASS_NAME, 'transaction-item')

    //         for transaction in transactions:

    //             mTransaction = models.Transaction()

    //             mTransaction.account = acc
    //             mTransaction.transaction_date = datetime.strptime(transaction.find_element(By.CLASS_NAME, 'transaction-item__date').text, '%a %d %b %Y')
    //             mTransaction.description = transaction.find_element(By.CLASS_NAME, 'transaction-item__short-details').text.split('\n')[0]
    //             mTransaction.debit = currencyHandler(transaction.find_element(By.CLASS_NAME, 'transaction-item__amounts__debit').text.split('\n')[0])
    //             mTransaction.credit = currencyHandler(transaction.find_element(By.CLASS_NAME, 'transaction-item__amounts__credit').text.split('\n')[0])

    //             # if not this.duplicateChecker(mTransaction):
    //             insertList.append(mTransaction)


    //     this.transactionHandler(insertList)      
    //     # models.Transaction.objects.bulk_create(insertList)




    // def transactionHandler(self, transactionList):

    //     categories = models.Categories.objects.all()
    //     analysisDescriptions = models.analysisDescription.objects.all()

    //     #arrays for future inserts
    //     newTransactions = []
    //     newDescriptions = set()
    //     newCategories = set()
    //     newTokens = set()
    //     newDesc_Tokens = set()

    //     for t in transactionList:

    //         print(f'process transaction {str(t)}')

    //         #go to next if duplicate
    //         if this.duplicateChecker(t):
    //             continue

    //         #match category if already mapped
    //         # if(analysisDescriptions):
    //         matchedDesc = None

    //         try:
    //             matchedDesc = analysisDescriptions.get(description = t.description)
    //         except models.analysisDescription.DoesNotExist:
    //             None



    //         if not matchedDesc and t.description not in [j.description for j in newDescriptions]:
    //             newDesc = models.analysisDescription()
    //             # newDesc.source_transaction = t
    //             newDesc.description = t.description
    //             tokenw = word_tokenize(t.description)
    //             newDesc.parts = tokenw

    //             # if(INSERT_CATEGORIES_FROM_LOAD):
    //             #     newDesc.category = tran.category

    //             print(f'process newDesc {str(newDesc)}')

    //             newDescriptions.add(newDesc)

    //             #generate tokens
    //             for token in tokenw:

    //                 s = models.analysisDescritpionToken()
    //                 s.analysisDescription = newDesc
    //                 s
    //                 if( token in [j.token for j in newTokens]):                
    //                     s.analysisToken = [b for b in newTokens if b.token==token][0]
    //                 else:
    //                     nToken = models.analysisToken()
    //                     nToken.token = token                                
    //                     s.analysisToken = nToken                                                                
    //                     newTokens.add(nToken)

    //                 newDesc_Tokens.add(s)

    //         if matchedDesc:
    //             t.category = matchedDesc.category



    //         newTransactions.append(t)


    //     # models.Transaction.objects.bulk_create(toSave)


    //     # models.Categories.objects.bulk_create(list(newCategories), ignore_conflicts=True)   
    //     models.analysisToken.objects.bulk_create(list(newTokens), ignore_conflicts=True)
    //     models.Transaction.objects.bulk_create(newTransactions)
    //     models.analysisDescription.objects.bulk_create(list(newDescriptions), ignore_conflicts=True)
    //     models.analysisDescritpionToken.objects.bulk_create(list(newDesc_Tokens), ignore_conflicts=True)


}

// const session = new session()